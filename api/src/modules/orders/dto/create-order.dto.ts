/* eslint-disable prettier/prettier */
//src/modules/orders/dto/create-order.dto.ts
//DTO for creating order

import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

class OrderItemDto {
    @ApiProperty({
        description: 'Alur Relasi: Create Category -> Ambil ID Category -> Create Product -> Ambil ID Product -> Paste di sini',
        example: 'CREATE_PRODUCT_FIRST_THEN_PASTE_ID_HERE',
    })
    @IsNotEmpty()
    @IsString()
    productId!: string;

    @ApiProperty({
        description: 'Jumlah barang yang dibeli',
        example: 10
    })
    @IsNotEmpty()
    @IsNumber()
    quantity!: number;

    @ApiProperty({
        description: 'Harga satuan produk',
        example: 99.99
    })
    @IsNumber({
        maxDecimalPlaces: 2
    }, { message: 'Price must be a valid number (e.g, 99.99)' })
    @Type(() => Number)
    price!: number
}

export class CreateOrderDto {
    // 👇 KUNCI PERUBAHANNYA ADA DI SINI (Ditambah kurung siku) 👇
    @ApiProperty({
        type: [OrderItemDto],
        description: 'Daftar produk yang ingin dipesan'
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items!: OrderItemDto[];

    @ApiProperty({
        required: false,
        description: 'Alamat lengkap pengiriman',
        example: 'usa/la'
    })
    @IsOptional()
    @IsString()
    shippingAddress?: string
}