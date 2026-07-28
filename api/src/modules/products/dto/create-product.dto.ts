/* eslint-disable prettier/prettier */
//src/modules/products/dto/create-product.dto.ts
//DTO for creating a product
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsOptional, MaxLength, Min, IsBoolean } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({
        description: 'Name of the product',
        example: 'Wireless Headphones',
        maxLength: 200,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    name!: string;

    @ApiProperty({
        description: 'Description of the product',
        example: 'High-quality wireless headphones with noise cancellation',
        required: false,
    })
    @IsString()
    @IsOptional()
    @MaxLength(500)
    description?: string;

    @ApiProperty({
        description: 'Price of the product in USD',
        example: 99.99,
        minimum: 0,
    })
    @IsNumber({
        maxDecimalPlaces: 2,
    })
    @Min(0)
    @Type(() => Number)
    price!: number;

    @ApiProperty({
        description: 'Stock quantity of the product',
        example: 100,
        minimum: 0,
    })
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    stock!: number;

    @ApiProperty({
        description: 'SKU (Stock Keeping Unit) of the product (Unique identifier)',
        example: 'WH-001',
        maxLength: 50,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    sku!: string;

    @ApiProperty({
        description: 'Image URL of the product',
        example: 'https://example.com/images/wireless-headphones.jpg',
        required: false,
    })
    @IsString()
    @IsOptional()
    imageUrl?: string;

    @ApiProperty({
        description: '### ⚠️ HARAP BACA SEBELUM EXECUTE\n1. Pastikan Anda sudah menjalankan **POST /categories**.\n2. Salin `id` dari hasil respons tersebut.\n3. Tempel `id` (UUID) tersebut di bawah ini.',
        example: 'PASTE_ID_DARI_RUTE_GET_CATEGORIES_DISINI',
    })
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    categoryId!: string;

    @ApiProperty({
        description: 'Indicates whether the product is active and available for purchase or not',
        example: true,
        default: true,
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}