/* eslint-disable prettier/prettier */
//src/modules/category/dto/create-category.dto.ts

import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
        example: 'Electronics',
        description: 'The name of the category',
        maxLength: 100,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name!: string;

    @ApiProperty({
        example: 'Devices and gadgets including phones, laptops, and accessories.',
        description: 'A brief description of the category',
        required: false,
        maxLength: 255,
    })
    @IsString()
    @IsOptional()
    @MaxLength(255)
    description?: string;

    @ApiProperty({
        example: 'electronics',
        description: 'A URL-friendly slug for the category',
        required: false,
        maxLength: 100,
    })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    slug?: string;

    @ApiProperty({
        example: 'https://example.com/images/electronics.jpg',
        description: 'URL of the category image',
        required: false,
        maxLength: 255,
    })
    @IsString()
    @IsOptional()
    imageUrl?: string;

    @ApiProperty({
        example: true,
        description: 'Indicates whether the category is active',
        required: false,
        default: true,
    })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}