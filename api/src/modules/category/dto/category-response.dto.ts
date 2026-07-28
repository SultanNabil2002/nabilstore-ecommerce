/* eslint-disable prettier/prettier */
//src/modules/category/dto/category-response.dto.ts
//DTO for category response

import { ApiProperty } from "@nestjs/swagger";

export class CategoryResponseDto {
    @ApiProperty({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'The unique identifier of the category',
    })
    id!: string;

    @ApiProperty({
        example: 'Electronics',
        description: 'The name of the category',
    })
    name!: string;

    @ApiProperty({
        example: 'Devices and gadgets including phones, laptops, and accessories',
        description: 'A brief description of the category',
        nullable: true
    })
    description?: string | null;

    @ApiProperty({
        example: 'electronics',
        description: 'The URL-friendly slug for the category',
    })
    slug!: string;

    @ApiProperty({
        example: 'https://example.com/images/electronics.png',
        description: 'URL of the category image',
        nullable: true
    })
    imageUrl?: string | null;

    @ApiProperty({
        example: true,
        description: 'Indicates whether the category is active',
        nullable: true
    })
    isActive!: boolean;

    @ApiProperty({
        example: 150,
        description: 'Number of products in this category',
    })
    productCount!: number;

    @ApiProperty({
        example: '2026-01-01T00:00:00.000Z',
        description: 'The date and time when the category was created',
    })
    createdAt!: Date;

    @ApiProperty({
        example: '2026-01-02T00:00:00.000Z',
        description: 'The date and time when the category was last updated',
    })
    updatedAt!: Date;
}