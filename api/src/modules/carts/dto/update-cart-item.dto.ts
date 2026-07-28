/* eslint-disable prettier/prettier */
// src/modules/carts/dto/update-cart-item.dto.ts

import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, Min } from "class-validator";

export class UpdateCartItemDto {
    @ApiProperty({
        description: 'The new quantity for the cart item',
        example: 2,
        minimum: 1
    })
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    quantity!: number;
}