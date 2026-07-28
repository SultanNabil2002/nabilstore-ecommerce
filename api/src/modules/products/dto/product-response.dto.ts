/* eslint-disable prettier/prettier */
//src/modules/products/dto/product-response.dto.ts
// Product Response DTO

import { ApiProperty } from "@nestjs/swagger";

export class ProductResponseDto {
    @ApiProperty({
        description: '(Product ID) Unique identifier of the product (UUID)',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id!: string;

    @ApiProperty({
        description: 'Name of the product',
        example: 'Wireless Headphones',
    })
    name!: string;

    @ApiProperty({
        description: 'Description of the product',
        example: 'High-quality wireless headphones with noise cancellation',
        nullable: true,
    })
    description?: string | null;

    @ApiProperty({
        description: 'Price of the product in USD',
        example: 99.99,
    })
    price!: number;

    @ApiProperty({
        description: 'Stock quantity of the product',
        example: 100,
    })
    stock!: number;

    @ApiProperty({
        description: 'SKU (Stock Keeping Unit) of the product (Unique identifier)',
        example: 'WH-001',
    })
    sku!: string;

    @ApiProperty({
        description: 'URL of the product image',
        example: 'https://example.com/images/wireless-headphones.jpg',
        nullable: true,
    })
    imageUrl?: string | null;

    @ApiProperty({
        description: 'Category of the product',
        example: 'Electronics',
    })
    category?: string | null;

    @ApiProperty({
        description: 'Indicates whether the product is active and available for purchase or not',
        example: true,
    })
    isActive!: boolean;

    @ApiProperty({
        description: 'Timestamp when the product was created',
        example: '2026-10-01T12:34:56.789Z',
    })
    createdAt!: Date;

    @ApiProperty({
        description: 'Timestamp when the product was last updated',
        example: '2026-10-02T15:20:30.123Z',
    })
    updatedAt!: Date;
}