/* eslint-disable prettier/prettier */
//src/modules/users/dtp/update-user.dto.ts

import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

//DTO for updateing user profile

export class UpdateUserDto {
    @ApiProperty({
        description: 'User email address',
        example: 'user@example.com',
        required: false,
    })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({
        description: 'User first name',
        example: 'sultan',
        required: false,
    })
    @IsOptional()
    @IsString()
    firstName?: string;

    @ApiProperty({
        description: 'User last name',
        example: 'nabil',
        required: false,
    })
    @IsOptional()
    @IsString()
    lastName?: string;
}