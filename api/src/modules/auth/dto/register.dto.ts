/* eslint-disable prettier/prettier */
//src/modules/auth/dto/register.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class RegisterDto {

    @ApiProperty({
        description: 'User email address',
        example: 'sultan.nabil@example.com'
    })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email!: string;

    @ApiProperty({
        description: 'User Password',
        example: 'StrongP@ssw0rd!',
    })
    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' })
    password!: string;

    @ApiProperty({
        description: 'User first name',
        example: 'Sultan',
        required: false,
    })
    @IsOptional()
    @IsString()
    firstName?: string;

    @ApiProperty({
        description: 'User last name',
        example: 'Nabil',
        required: false,
    })
    @IsOptional()
    @IsString()
    lastName?: string;
}