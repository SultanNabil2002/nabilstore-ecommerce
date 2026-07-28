/* eslint-disable prettier/prettier */
//src/modules/payments/dto/create-payment-intent.dto.ts

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePaymentIntentDto {
    @ApiProperty({
        description: 'Langkah pengujian: 1. Auth Login -> 2. Hit rute GET /api/v1/orders/admin/all -> 3. Salin salah satu ID Order -> 4. Paste ID tersebut di sini.',
        example: 'eb94cf0d-f615-434a-95c1-c06a3801bd8c (Langkah pengujian: 1. Auth Login -> 2. Hit rute GET /api/v1/orders/admin/all -> 3. Salin salah satu ID Order -> 4. Paste ID tersebut di sini.)'
    })
    @IsNotEmpty()
    @IsString()
    orderId!: string;

    @ApiProperty({
        description: 'Jumlah tagihan dalam pecahan sen (akan dikali 100 di sistem)',
        example: 99.99
    })
    @IsNotEmpty()
    @IsNumber()
    amount!: number;

    @ApiProperty({
        description: 'Mata uang yang digunakan',
        example: 'usd',
        required: false
    })
    @IsOptional()
    @IsString()
    currency?: string = 'usd';

    @ApiProperty({
        description: 'Catatan tambahan (opsional)',
        example: '',
        required: false
    })
    @IsOptional()
    @IsString()
    description?: string;
}