/* eslint-disable prettier/prettier */
// src/modules/carts/dto/add-to-cart.dto.ts

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, Min } from "class-validator";

export class AddToCartDto {
    @ApiProperty({
        description: 'The UUID ID of the product to add to the cart',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsString()
    @IsNotEmpty()
    productId!: string;

    @ApiProperty({
        description: 'The quantity of the product to add to the cart',
        example: 1,
        default: 1
    })
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    quantity!: number;
}