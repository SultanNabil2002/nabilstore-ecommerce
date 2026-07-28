/* eslint-disable prettier/prettier */
// Contoh: src/modules/carts/dto/cart-api-response.dto.ts

import { ApiProperty } from "@nestjs/swagger";

// Amplop Utama (Generic)
export class CartApiResponseDto<T> {
    @ApiProperty({ example: true })
    success!: boolean;

    @ApiProperty({ example: 'Operation successful' })
    message!: string;

    @ApiProperty()
    data!: T | null;
}