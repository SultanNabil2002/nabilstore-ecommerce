/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiTooManyRequestsResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CartsService } from './carts.service';
import { RelaxedThrottle } from 'src/common/decorators/custom-throttler.decorator';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { CartResponseDto } from './dto/cart-response.dto';
import { CartApiResponseDto } from './dto/cart-api-response.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@ApiTags('carts')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('carts')
export class CartsController {
    constructor(private readonly cartsService: CartsService) { }

    //Add items
    @Post('items')
    @RelaxedThrottle()
    @ApiOperation({
        summary: 'Add item to cart'
    })
    @ApiBody({
        type: AddToCartDto
    })
    @ApiCreatedResponse({
        description: 'Item successfully added to cart',
        type: CartResponseDto, // Swagger akan memetakan ini ke dalam pola amplop jika disetting global, atau bisa didefinisikan spesifik
    })
    @ApiBadRequestResponse({
        description: "Invalid productId or quantity, or insufficient stock."
    })
    @ApiNotFoundResponse({
        description: "Product not found in the database."
    })
    @ApiTooManyRequestsResponse({
        description: 'Too many requests - rate limit'
    })
    async create(@Body() addToCartDto: AddToCartDto, @GetUser('id') userId: string): Promise<CartApiResponseDto<CartResponseDto>> {
        return await this.cartsService.addToCart(userId, addToCartDto);
    }

    //See active cart contents
    @Get()
    @ApiOperation({
        summary: 'Get active cart',
        description: 'Retrieves the current active (not checked out) cart for the logged-in user.'
    })
    @ApiOkResponse({
        description: 'Active cart retrieved successfully',
        type: CartResponseDto,
    })
    async getActiveCart(
        @GetUser('id') userId: string
    ) {
        // Kita hanya melempar userId ke dalam ruang mesin (Service)
        return await this.cartsService.getActiveCart(userId);
    }

    //Change quantity
    @Patch('items/:id')
    @ApiOperation({
        summary: 'Update cart item quantity',
        description: 'Updates the quantity of a specific item in the active cart.'
    })
    @ApiOkResponse({
        description: 'Cart item updated successfully',
        type: CartResponseDto, // Kita kembalikan wujud keranjang terbaru agar total harga di layar HP ikut berubah!
    })
    @ApiNotFoundResponse({
        description: 'Cart item not found in the active cart'
    })
    async updateItemQuantity(
        @Param('id', ParseUUIDPipe) cartItemId: string, // Menangkap :id dari URL
        @Body() updateCartItemDto: UpdateCartItemDto,   // Menangkap { quantity: 2 } dari Body
        @GetUser('id') userId: string                   // Mengetahui siapa yang mengubah
    ) {
        return await this.cartsService.updateItemQuantity(userId, cartItemId, updateCartItemDto);
    }

    @Delete('items/:id')
    @ApiOperation({
        summary: 'Remove item from cart',
        description: 'Deletes a specific item from the active cart.'
    })
    @ApiOkResponse({
        description: 'Cart item removed successfully',
        type: CartResponseDto, // Kita tetap mengembalikan wujud keranjang terbaru!
    })
    @ApiNotFoundResponse({
        description: 'Cart item not found in the active cart'
    })
    async removeItemFromCart(
        @Param('id', ParseUUIDPipe) cartItemId: string, // Satpam UUID tetap berjaga di sini
        @GetUser('id') userId: string                   // Mengetahui siapa pemiliknya
    ) {
        return await this.cartsService.removeItemFromCart(userId, cartItemId);
    }
}
