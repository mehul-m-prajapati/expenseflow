import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';


@Injectable()
export class AuthService {

    constructor (private readonly prisma: PrismaService) {

    }

    /**
     * 
     */
    async register(dto: RegisterDto) {

        const email = dto.email.toLowerCase().trim();

        const existingUser = await this.prisma.user.findUnique({
            where: {email},
        });

        if (existingUser) {
            throw new ConflictException('Email is already registered');
        }

        const passwordHash = await bcrypt.hash(dto.password, 12);

        try {
            const user = await this.prisma.user.create({
                data: {
                    name: dto.name,
                    email,
                    passwordHash,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                }
            });

            return user;
            
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new ConflictException('Email is already registered');
            }

            throw error;
        }
    }


}
