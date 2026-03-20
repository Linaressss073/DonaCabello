import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LOGIN_PORT, LoginPort } from '../../../../domain/ports/in/login.port';
import { REGISTER_PORT, RegisterPort } from '../../../../domain/ports/in/register.port';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(LOGIN_PORT) private readonly loginUseCase: LoginPort,
    @Inject(REGISTER_PORT) private readonly registerUseCase: RegisterPort,
  ) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.registerUseCase.execute(dto);
  }

  @Get('me')
  getMe(@Req() req: any) {
    // TODO: implementar con JwtAuthGuard
    throw new Error('Not implemented');
  }
}
