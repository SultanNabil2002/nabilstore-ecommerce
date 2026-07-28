/* eslint-disable prettier/prettier */
//src/modules/orders/dto/update-order.dto.ts

import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateOrderDto {
    @ApiProperty({
        required: false,
        enum: OrderStatus,
        description: 'Update status pesanan (contoh: ubah dari PENDING menjadi SHIPPED atau PROCESSING)',
        example: 'SHIPPED'
    })
    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus;

    // 👇 JUBAH GAIB SWAGGER DIPASANG DI SINI 👇
    @ApiHideProperty()
    @IsOptional()
    @IsString()
    trackingNumber?: string;

    // 👇 JUBAH GAIB SWAGGER DIPASANG DI SINI 👇
    @ApiHideProperty()
    @IsOptional()
    @IsString()
    notes?: string;
}