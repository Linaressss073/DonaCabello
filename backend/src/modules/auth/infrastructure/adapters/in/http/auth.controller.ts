import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LOGIN_PORT, LoginPort } from '../../../../domain/ports/in/login.port';
import { REGISTER_PORT, RegisterPort } from '../../../../domain/ports/in/register.port';
import { JwtAuthGuard } from './jwt-auth.guard';
import { GetUser, JwtUser } from '../../../../../../shared/decorators/get-user.decorator';

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

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@GetUser() user: JwtUser) {
    return user;
  }
}
