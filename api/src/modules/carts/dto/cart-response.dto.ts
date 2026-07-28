/* eslint-disable prettier/prettier */
//src/modules/carts/dto/cart-response.dto.ts

export class CartItemResponseDto {
    id!: string;
    productId!: string;
    productName!: string;
    price!: number; // Harga 1 barang
    quantity!: number;
    subTotal!: number; // (price * quantity)
}

export class CartResponseDto {
    id!: string;
    userId!: string;
    checkedOut!: boolean;
    totalAmount!: number; // Total harga semua barang di keranjang
    items!: CartItemResponseDto[];
    createdAt!: Date;
    updatedAt!: Date;
}