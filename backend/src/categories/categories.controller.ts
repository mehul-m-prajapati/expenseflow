
import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Patch,
  Delete,
  ParseEnumPipe,
  Param,
  ParseUUIDPipe
} from '@nestjs/common';
import { TransactionType } from '@prisma/client';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt/jwt.guard'

import { Req } from '@nestjs/common';
import { Request } from 'express';


interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}


@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  
    constructor(
        private readonly categoriesService: CategoriesService,
    ) {}

    /**
     * 
     * @param dto 
     * @returns 
     */
    @Post()
    async create(@Req() req: AuthenticatedRequest, @Body() dto: CreateCategoryDto) {

        const category = await this.categoriesService.create(req.user.userId, dto);

        return {
            success: true,
            message: 'Category created successfully',
            data: category,
        };
    }

    /**
     * 
     * @param type 
     * @returns 
     */
    @Get()
    async findAll(
        @Req() req: AuthenticatedRequest,
        @Query(
            'type',
            new ParseEnumPipe(TransactionType, { optional: true }),
        )
        type?: TransactionType,
    ) {
        
        const categories = await this.categoriesService.findAll(req.user.userId, type);

        return {
            success: true,
            data: categories,
        };
    }

    /**
     * 
     * @param id 
     * @param dto 
     * @returns 
     */
    @Patch(':id')
    async update(
        @Req() req: AuthenticatedRequest,
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateCategoryDto,
    ) {
        const category = await this.categoriesService.update(req.user.userId, id, dto);

        return {
            success: true,
            message: 'Category updated successfully',
            data: category,
        };
    }

    /**
     * 
     * @param id 
     * @returns 
     */
    @Delete(':id')
    async remove(@Req() req: AuthenticatedRequest, @Param('id', ParseUUIDPipe) id: string) {
        
        await this.categoriesService.remove(req.user.userId, id);

        return {
            success: true,
            message: 'Category deleted successfully',
        };
    }

}
