
import {
  Injectable,
  ConflictException,
  NotFoundException
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Prisma, TransactionType } from '@prisma/client';

@Injectable()
export class CategoriesService {

  constructor(private readonly prisma: PrismaService) {}

  // Temporary development user.
  // Replace with authenticated user ID after JWT integration.
  private readonly testUserId = '00000000-0000-4000-8000-000000000001';

  /**
   * 
   * @param dto 
   * @returns 
   */
  async create(dto: CreateCategoryDto) {
    try {

      return await this.prisma.category.create({
        data: {
          ...dto,
          userId: this.testUserId,
        },
      });
    } 
    catch (error: any) {
        if (
            error.code === 'P2002'
        ) {
            throw new ConflictException(
            'Category with this name and type already exists',
            );
        }

        throw error;
    }
  }
  
  /**
   * 
   * @param type 
   * @returns 
   */
  async findAll(type?: TransactionType) {

        return this.prisma.category.findMany({
            where: {
                userId: this.testUserId,
                ...(type && { type }),
            },
            orderBy: {
                name: 'asc',
            },
        });
    }

    /**
     * 
     * @param id 
     * @param dto 
     * @returns 
     */
    async update(id: string, dto: UpdateCategoryDto) {

        try {
            const result = await this.prisma.category.updateMany({
                where: {
                    id,
                    userId: this.testUserId,
                },
                data: dto,
            });

            if (result.count === 0) {
                throw new NotFoundException('Category not found');
            }

            return this.prisma.category.findFirst({
                where: {
                    id,
                    userId: this.testUserId,
                },
            });
        } 
        catch (error: any) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new ConflictException(
                    'Category with this name and type already exists',
                );
            }
            throw error;
        }
    }

    /**
     * 
     * @param id 
     * @returns 
     */
    async remove(id: string) {
        const result = await this.prisma.category.deleteMany({
            where: {
                id,
                userId: this.testUserId,
            },
        });

        if (result.count === 0) {
            throw new NotFoundException('Category not found');
        }

        return { message: 'Category deleted successfully' };
    }

}
