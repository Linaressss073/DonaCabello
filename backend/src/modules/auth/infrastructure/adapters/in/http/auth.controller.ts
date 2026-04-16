import { Body, Controller, Get, HttpCode, Inject, Post, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LOGIN_PORT, LoginPort } from '../../../../domain/ports/in/login.port';
import { REGISTER_PORT, RegisterPort } from '../../../../domain/ports/in/register.port';
import { FORGOT_PASSWORD_PORT, ForgotPasswordPort } from '../../../../domain/ports/in/forgot-password.port';
import { RESET_PASSWORD_PORT, ResetPasswordPort } from '../../../../domain/ports/in/reset-password.port';
import { JwtAuthGuard } from '../../../../../../shared/guards/jwt-auth.guard';
import { GetUser } from '../../../../../../shared/decorators/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(LOGIN_PORT) private readonly loginUseCase: LoginPort,
    @Inject(REGISTER_PORT) private readonly registerUseCase: RegisterPort,
    @Inject(FORGOT_PASSWORD_PORT) private readonly forgotPasswordUseCase: ForgotPasswordPort,
    @Inject(RESET_PASSWORD_PORT) private readonly resetPasswordUseCase: ResetPasswordPort,
  ) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const result = await this.loginUseCase.execute(dto);
    return { access_token: result.accessToken, user: result.user };
  }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const result = await this.registerUseCase.execute(dto);
    return { access_token: result.accessToken, user: result.user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@GetUser() user: any) {
    return user;
  }

  @Post('forgot-password')
  @HttpCode(200)
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    await this.forgotPasswordUseCase.execute(dto);
    return { message: 'Si el correo existe, recibirás un enlace de recuperación.' };
  }

  @Post('reset-password')
  @HttpCode(200)
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.resetPasswordUseCase.execute(dto);
    return { message: 'Contraseña actualizada correctamente.' };
  }
}
