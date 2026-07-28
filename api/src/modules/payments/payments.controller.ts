/* eslint-disable prettier/prettier */
//src/modules/payments/payments.controller.ts
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { PaymentsService } from './payments.service';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { CreatePaymentIntentApiResponseDto, PaymentApiResponseDto } from './dto/payment-response.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';

@Controller('payments')
@UseGuards(JwtAuthGuard)
@ApiTags('Payments')
@ApiBearerAuth("JWT-auth")
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Post("create-intent")
    @ApiOperation({
        summary: 'Create a payment intent',
        description: 'Creates a payment intent for processing payments.'
    })
    @ApiCreatedResponse({
        description: 'Payment intent created successfully.',
        type: CreatePaymentIntentApiResponseDto
    })
    @ApiBadRequestResponse({
        description: 'Invalid request data or order not found.'
    })
    async createPaymentIntent(
        @Body() createPaymentIntentDto: CreatePaymentIntentDto, @GetUser('id') userId: string
    ) {
        return await this.paymentsService.createPaymentIntent(userId, createPaymentIntentDto);
    }

    @Post('confirm')
    @ApiOperation({
        summary: 'Confirm a payment intent',
        description: 'Confirms a payment intent for an order.'
    })
    @ApiResponse({
        status: 200,
        description: "Payment confirmed successfully",
        type: PaymentApiResponseDto
    })
    @ApiBadRequestResponse({
        description: 'Payment not found or already completed.'
    })
    async confirmPayment(@Body() confirmPaymentDto: ConfirmPaymentDto, @GetUser('id') userId: string) {
        return await this.paymentsService.confirmPayment(userId, confirmPaymentDto);
    }

    @Get()
    @ApiOperation({
        summary: "Get all payments",
        description: "get all payments for the current user"
    })
    @ApiOkResponse({
        description: 'Payments retrieved successfully',
        type: PaymentApiResponseDto,
    })
    async findAll(@GetUser('id') userId: string) {
        return await this.paymentsService.findAll(userId);
    }

    @Get(':id')
    @ApiParam({
        name: 'id',
        description: 'The ID of the payment to retrieve',
        example: '2165465-454-sds4s854d65',
    })
    @ApiOperation({
        summary: 'Get a payment by ID',
        description: 'Get a specific payment by its Id'
    })
    @ApiOkResponse({
        description: 'Payment retrieved successfully',
        type: PaymentApiResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'Payment not found',
    })
    async findOne(@Param('id') id: string, @GetUser('id') userId: string) {
        return await this.paymentsService.findOne(id, userId);
    }

    //Get payment by order ID
    @Get('order/:orderId')
    @ApiParam({
        name: 'orderId',
        description: 'Order IDD',
        example: 'order-123',
    })
    @ApiOperation({
        summary: 'Get a payment by order ID',
        description: 'Get a specific payment by its order ID'
    })
    @ApiOkResponse({
        description: 'Payment retrieved successfully',
        type: PaymentApiResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'Payment not found',
    })
    async findByOrder(@Param('orderId') orderId: string, @GetUser('id') userId: string) {
        return await this.paymentsService.findByOrder(orderId, userId);
    }
}
