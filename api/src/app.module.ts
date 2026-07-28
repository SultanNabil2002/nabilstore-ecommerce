/* eslint-disable prettier/prettier */
// src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { PaymentsModule } from './modules/payments/payments.module';
import { CartsModule } from './modules/carts/carts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 60000 milidetik = 60 detik
        limit: 10, // maksimal 10 request (klik)
      }
    ]),
    // Load .env file and make it available globally
    PrismaModule, AuthModule, UsersModule, CategoryModule, ProductsModule, OrdersModule, PaymentsModule, CartsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

/*
sintaks:
ThrottlerModule.forRoot([
      {
        ttl: 60000, // 60000 milidetik = 60 detik
        limit: 10, // maksimal 10 request (klik)
      }
    ]),
Maksud Bahasa Manusianya:
"Dalam kurun waktu 60 detik penuh, satu orang pengunjung hanya boleh mengklik tombol Execute di Swagger (mengirim request) maksimal 10 kali."

Apa yang terjadi jika saya klik 11 kali?
Jika Anda mengklik Execute untuk yang ke-11 kalinya di detik ke-45, maka klik ke-11 itu akan gagal total. Layar akan merah, dan pesan 429 Too Many Requests akan muncul. Anda (sebagai pengunjung) harus menunggu sampai detik ke-61 barulah Anda diizinkan mengklik Execute lagi.

Catatan Kecil untuk custom-throttler.decorator.ts Anda:
Karena versi Anda menggunakan milidetik, instruktur Anda menuliskannya dengan sangat masuk akal di file tersebut:
*/
