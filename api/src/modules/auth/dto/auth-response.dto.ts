/* eslint-disable prettier/prettier */
// src/modules/auth/dto/auth-response.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";

export class AuthResponseDto {

    @ApiProperty({
        description: 'Access token for authentication',
        // Cukup tempelkan teks acak yang formatnya menyerupai JWT (tiga bagian dipisah titik)
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLTEyMyIsImVtYWlsIjoic3VsdGFuLm5hYmlsQGV4YW1wbGUuY29tIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    })
    accessToken!: string;

    @ApiProperty({
        description: 'Refresh token for obtaining new access tokens',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLTEyMyIsImVtYWlsIjoic3VsdGFuLm5hYmlsQGV4YW1wbGUuY29tIiwicmVmcmVzaElkIjoiYTFiMmMzZDRlNWY2In0.xY7Zz9_aBcD123EfGhI456JkL789MnO012PqRsTuVwX',
    })
    refreshToken!: string;

    @ApiProperty({
        description: 'Authenticated user information',
        example: {
            id: 'user-123',
            email: 'sultan.nabil@example.com',
            firstName: 'Sultan',
            lastName: 'Nabil',
            role: 'USER'
        },
    })
    user!: {
        id: string;
        email: string;
        firstName?: string | null;
        lastName?: string | null;
        role: Role;
    };
}