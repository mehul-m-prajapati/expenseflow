import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor (
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) {}


    /**
     * 
     * @param dto 
     */
    async login(dto: LoginDto) {

        const email = dto.email.toLowerCase().trim();

        const user = await this.prisma.user.findUnique({
            where: {email}
        });

        if (!user) {
            throw new UnauthorizedException('Invalid email');
        }

        const passwordMatches = await bcrypt.compare(
            dto.password,
            user.passwordHash,
        );

        if (!passwordMatches) {
            throw new UnauthorizedException('Invalid password');
        }

        const payload = {
            sub: user.id,
            email: user.email,
        }

        const accessToken = await this.jwtService.signAsync(payload);

        return {
            accessToken,
            tokenType: 'Bearer',
            expiresIn: '1d',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        }

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
