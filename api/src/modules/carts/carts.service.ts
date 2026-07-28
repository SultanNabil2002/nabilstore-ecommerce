/* eslint-disable prettier/prettier */
//src/modules/carts/carts.service.ts

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { CartApiResponseDto } from './dto/cart-api-response.dto';
import { CartResponseDto, CartItemResponseDto } from './dto/cart-response.dto';
import { Cart, CartItem, Product } from '@prisma/client';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

// Mendefinisikan tipe data bentukan dari Prisma Include agar parameter fungsi Helper bersih
type CartWithItemsAndProducts = Cart & {
    cartItems: (CartItem & {
        product: Product;
    })[];
};

@Injectable()
export class CartsService {
    constructor(private readonly prisma: PrismaService) { }

    async addToCart(
        userId: string,
        addToCartDto: AddToCartDto
    ): Promise<CartApiResponseDto<CartResponseDto>> {
        const { productId, quantity } = addToCartDto;

        const product = await this.prisma.product.findUnique({
            where: { id: productId }
        });

        if (!product) {
            throw new NotFoundException(`Product with ID ${productId} does not exist`);
        }

        if (product.stock < quantity) {
            throw new BadRequestException(`Insufficient stock for product ${product.name}`);
        }

        const cart = await this.prisma.$transaction(async (tx) => {

            const activeCart = await tx.cart.findFirst({
                where: { userId, checkedOut: false }
            }) ?? await tx.cart.create({
                data: { userId }
            });

            const existingCartItem = await tx.cartItem.findFirst({
                where: {
                    cartId: activeCart.id,
                    productId: productId
                }
            });

            if (existingCartItem) {
                await tx.cartItem.update({
                    where: { id: existingCartItem.id },
                    data: { quantity: { increment: quantity } }
                });
            } else {
                await tx.cartItem.create({
                    data: { cartId: activeCart.id, productId, quantity }
                });
            }

            return await tx.cart.findUniqueOrThrow({
                where: { id: activeCart.id },
                include: {
                    cartItems: {
                        include: { product: true },
                        orderBy: { createdAt: 'asc' }
                    }
                }
            });
        });

        return {
            success: true,
            message: 'Item successfully added to cart',
            data: this.mapToCartResponse(cart)
        };
    }

    async getActiveCart(
        userId: string
    ): Promise<CartApiResponseDto<CartResponseDto>> {

        // 1. Cari Keranjang Aktif Pembeli beserta seluruh isinya
        const activeCart = await this.prisma.cart.findFirst({
            where: {
                userId,
                checkedOut: false
            },
            include: {
                cartItems: {
                    include: { product: true },
                    orderBy: { createdAt: 'asc' }
                }
            }
        });

        // 2. Graceful Degradation (Penanganan Jika Kosong)
        if (!activeCart) {
            return {
                success: true,
                message: 'Your cart is empty',
                data: null
            };
        }

        // 3. Cuci Data dan Kembalikan ke Frontend
        return {
            success: true,
            message: 'Active cart retrieved successfully',
            data: this.mapToCartResponse(activeCart)
        };
    }

    async updateItemQuantity(
        userId: string,
        cartItemId: string,
        updateCartItemDto: UpdateCartItemDto
    ): Promise<CartApiResponseDto<CartResponseDto>> {

        const { quantity } = updateCartItemDto;

        // 1. Validasi Eksistensi dan Kepemilikan (Security Check)
        // Kita WAJIB memastikan bahwa cartItemId ini benar-benar milik userId yang sedang login.
        // Jika tidak, hacker bisa mengubah keranjang belanja orang lain!
        const existingCartItem = await this.prisma.cartItem.findFirst({
            where: {
                id: cartItemId,
                cart: {
                    userId: userId,       // Harus milik user ini
                    checkedOut: false     // Keranjangnya belum dibayar
                }
            }
        });

        if (!existingCartItem) {
            throw new NotFoundException('Cart item not found in your active cart');
        }

        /**
         * MENGAPA MENGGUNAKAN TRANSACTION DI SINI?
         * * [Kapan Transaction Digunakan Secara Umum?]
         * Transaction wajib digunakan setiap kali kita memiliki LEBIH DARI SATU perintah database
         * (seperti Create, Update, Delete, atau kombinasi Update & Read) yang saling bergantung.
         * Jika salah satu perintah gagal, semua harus dibatalkan (Rollback) agar database tidak cacat.
         * * [Kenapa Digunakan di Rute Ubah Kuantitas (Bukan Pembayaran)?]
         * Di sini kita melakukan 2 langkah beruntun:
         * 1. UPDATE kuantitas barang (tx.cartItem.update)
         * 2. READ seluruh isi keranjang terbaru (tx.cart.findUniqueOrThrow)
         * * Walaupun belum masuk tahap pembayaran, kita tetap butuh Transaction untuk menghindari 
         * "Race Condition" (Tabrakan Data). Bayangkan jika pembeli menekan tombol [+] dan [-] 
         * secara sangat cepat di HP mereka:
         * Jika tanpa Transaction, di jeda sepersekian milidetik antara proses UPDATE dan READ,
         * sistem bisa saja menarik data keranjang yang salah atau belum selesai diperbarui oleh 
         * klik yang lain. Transaction mengunci proses ini (Atomicity) sehingga operasi dipastikan 
         * 100% selesai dan aman sebelum kita mengembalikan nilai total belanja ke Frontend.
         */
        // 2. Ruang Karantina (Transaction)
        const updatedCart = await this.prisma.$transaction(async (tx) => {

            // A. Update kuantitas barang tersebut (Bukan pakai increment, tapi menimpa angkanya)
            await tx.cartItem.update({
                where: { id: cartItemId },
                data: { quantity: quantity }
            });

            // B. Tarik ulang seluruh data keranjang terbaru untuk di-return
            return await tx.cart.findUniqueOrThrow({
                where: { id: existingCartItem.cartId },
                include: {
                    cartItems: {
                        include: { product: true },
                        orderBy: { createdAt: 'asc' }
                    }
                }
            });
        });

        // 3. Kirim ke Mesin Cuci Helper
        return {
            success: true,
            message: 'Cart item quantity updated successfully',
            data: this.mapToCartResponse(updatedCart)
        };
    }

    async removeItemFromCart(
        userId: string,
        cartItemId: string
    ): Promise<CartApiResponseDto<CartResponseDto>> {

        // 1. Validasi Eksistensi dan Kepemilikan (Security Check)
        // Memastikan barang yang mau dihapus benar-benar ada di keranjang aktif milik user ini.
        const existingCartItem = await this.prisma.cartItem.findFirst({
            where: {
                id: cartItemId,
                cart: {
                    userId: userId,
                    checkedOut: false
                }
            }
        });

        if (!existingCartItem) {
            throw new NotFoundException('Cart item not found in your active cart');
        }

        // 2. Ruang Karantina (Transaction)
        const updatedCart = await this.prisma.$transaction(async (tx) => {

            // A. Hapus baris barang tersebut dari tabel CartItem secara permanen
            await tx.cartItem.delete({
                where: { id: cartItemId }
            });

            // B. Tarik ulang seluruh data keranjang terbaru (yang sudah kehilangan 1 barang)
            return await tx.cart.findUniqueOrThrow({
                where: { id: existingCartItem.cartId },
                include: {
                    cartItems: {
                        include: { product: true },
                        orderBy: { createdAt: 'asc' }
                    }
                }
            });
        });

        // 3. Kirim ke Mesin Cuci Helper
        return {
            success: true,
            message: 'Cart item removed successfully',
            data: this.mapToCartResponse(updatedCart)
        };
    }

    /**
     * Helper method to map Prisma entities to DTO and handle Decimal conversions
     */
    private mapToCartResponse(cart: CartWithItemsAndProducts): CartResponseDto {

        const mappedItems: CartItemResponseDto[] = cart.cartItems.map((item) => {
            const priceAsNumber = item.product.price.toNumber();

            return {
                id: item.id,
                productId: item.productId,
                productName: item.product.name,
                price: priceAsNumber,
                quantity: item.quantity,
                subTotal: priceAsNumber * item.quantity
            };
        });

        const totalCartAmount = mappedItems.reduce(
            (sum, currentItem) => sum + currentItem.subTotal, 0
        );

        return {
            id: cart.id,
            userId: cart.userId,
            checkedOut: cart.checkedOut,
            totalAmount: totalCartAmount,
            items: mappedItems,
            createdAt: cart.createdAt,
            updatedAt: cart.updatedAt,
        };
    }
}