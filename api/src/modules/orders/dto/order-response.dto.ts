/* eslint-disable prettier/prettier */
//src/modules/orders/dto/order-response.dto.ts

import { ApiProperty } from "@nestjs/swagger";

export class OrderApiResponseDto<T> {
    @ApiProperty({ description: "Indicates if the request was success" })
    success!: boolean;

    @ApiProperty({ description: "Optional message", nullable: true, required: false })
    message?: string;

    @ApiProperty({ description: "Returned data", type: Object })
    data!: T;
}

// URUTAN DIRAPIKAN SESUAI SCHEMA PRISMA ORDER_ITEM
export class OrderItemResponseDto {
    @ApiProperty() id!: string;
    @ApiProperty() quantity!: number;
    @ApiProperty() price!: number;
    @ApiProperty() subtotal!: number; // (Ini tambahan komputasi backend, tidak ada di DB)

    // Foreign Keys / Relations
    @ApiProperty() productId!: string;
    @ApiProperty() productName!: string; // (Hasil relasi dari tabel Product)

    @ApiProperty() createdAt!: Date;
    @ApiProperty() updatedAt!: Date;
}

// URUTAN DIRAPIKAN SESUAI SCHEMA PRISMA ORDER
export class OrderResponseDto {
    @ApiProperty() id!: string;
    @ApiProperty() status!: string;
    @ApiProperty() total!: number;
    @ApiProperty() shippingAddress!: string;

    // Foreign Keys
    @ApiProperty() userId!: string;

    // (cartId sengaja tidak dimasukkan ke DTO karena Frontend tidak butuh data CartId)

    // Relations
    @ApiProperty({ type: [OrderItemResponseDto] })
    items!: OrderItemResponseDto[]

    @ApiProperty() createdAt!: Date;
    @ApiProperty() updatedAt!: Date;
}

export class PaginatedOrderResponseDto {
    @ApiProperty({
        type: [OrderResponseDto]
    })
    data!: OrderResponseDto[]

    @ApiProperty()
    total!: number;

    @ApiProperty()
    page!: number;

    @ApiProperty()
    limit!: number;
}