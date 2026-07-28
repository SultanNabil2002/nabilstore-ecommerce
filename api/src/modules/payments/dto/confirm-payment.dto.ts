/* eslint-disable prettier/prettier */
// src/modules/payments/dto/confirm-payment.dto.ts

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ConfirmPaymentDto {
    @ApiProperty({
        description: 'Langkah pengujian: 1. Jalankan rute POST /payments/create-intent -> 2. Lihat hasil clientSecret (contoh: pi_123_secret_abc) -> 3. Ambil dan paste di sini.',
        example: 'pi_1J2Y3Z4A5B6C7 (Langkah pengujian: 1. Jalankan rute POST /payments/create-intent -> 2. Lihat hasil clientSecret (contoh: pi_123_secret_abc) -> 3. Ambildan paste di sini. Atau Buka Database -> Tabel Payment -> Lihat kolom transactionId -> Salin dan paste di sini.)'
    })
    @IsNotEmpty()
    @IsString()
    paymentIntentId!: string;

    @ApiProperty({
        description: 'ID Pesanan yang sama dengan yang Anda gunakan saat membuat payment intent sebelumnya.',
        example: 'eb94cf0d-f615-434a-95c1-c06a3801bd8c (ID Pesanan yang sama dengan yang Anda gunakan saat membuat payment intent sebelumnya.)'
    })
    @IsNotEmpty()
    @IsString()
    orderId!: string;
}