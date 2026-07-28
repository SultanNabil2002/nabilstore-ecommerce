/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CategoryResponseDto } from './dto/category-response.dto';
import { CategoryService } from './category.service';
import { QueryCategoryDto } from './dto/query-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    //Create a new category
    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Create a new category' })
    @ApiBody({ type: CreateCategoryDto })
    @ApiResponse({ status: 201, description: 'The category has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input data.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 409, description: 'Category with this slug already exists.' })
    async create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryResponseDto> {
        return await this.categoryService.create(createCategoryDto);
    }

    //Get all categories
    @Get()
    @ApiOperation({ summary: 'Get all categories' })
    @ApiResponse({
        status: 200,
        description: 'List of categories retrieved successfully.',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/CategoryResponseDto' }
                },
                meta: {
                    type: 'object',
                    properties: {
                        total: { type: 'number' },
                        page: { type: 'number' },
                        limit: { type: 'number' },
                        totalPages: { type: 'number' }
                    }
                }
            }
        }
    })
    async findAll(@Query() queryDto: QueryCategoryDto) {
        return await this.categoryService.findAll(queryDto);
    }

    //Get category by ID
    @Get(":id")
    @ApiOperation({ summary: 'Get category by ID' })
    @ApiResponse({
        status: 200,
        description: 'Category details.',
        type: CategoryResponseDto
    })
    @ApiResponse({
        status: 404,
        description: 'Category not found.'
    })
    async findOne(@Param('id') id: string): Promise<CategoryResponseDto> {
        return await this.categoryService.findOne(id);
    }

    // Get category by slug
    @Get('slug/:slug')
    @ApiOperation({
        summary: 'Get category by slug',
    })
    @ApiResponse({
        status: 200,
        description: 'Category details.',
        type: CategoryResponseDto
    })
    @ApiResponse({
        status: 404,
        description: 'Category not found.'
    })
    async findBySlug(@Param('slug') slug: string): Promise<CategoryResponseDto> {
        return await this.categoryService.findBySlug(slug);
    }

    //Update category ( admin only )
    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Update category (Admin only)' })
    @ApiBody({ type: UpdateCategoryDto })
    @ApiResponse({
        status: 200,
        description: 'The category has been successfully updated.',
        type: CategoryResponseDto
    })
    @ApiResponse({ status: 404, description: 'Category not found.' })
    @ApiResponse({ status: 409, description: 'Category slug already exists.' })
    async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<CategoryResponseDto> {
        return await this.categoryService.update(id, updateCategoryDto);
    }

    // Delete category (Admin only)
    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('JWT-auth')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete category (Admin only)' })
    @ApiResponse({
        status: 400,
        description: 'Cannot delete category with products.'
    })
    async remove(@Param('id') id: string): Promise<{ message: string }> {
        return await this.categoryService.remove(id);
    }
}
