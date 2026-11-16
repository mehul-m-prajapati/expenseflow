import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    /**
     * 
     * @param dto 
     */
    @Post('login')
    async login(@Body() dto: LoginDto) {
        return {
            success: true,
            message: 'Login successful',
            data: await this.authService.login(dto),
        }
    }

    /**
     * 
     * @param dto 
     * @returns 
     */
    @Post('register')
    async register(@Body() dto: RegisterDto) {

        const user = await this.authService.register(dto);

        return {
            success: true,
            message: 'User registered successfully',
            data: user,
        }
    }


}
