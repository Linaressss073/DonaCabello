import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { LoginCommand, LoginPort, LoginResult } from '../../domain/ports/in/login.port';
import { AUTH_REPOSITORY_PORT, AuthRepositoryPort } from '../../domain/ports/out/auth-repository.port';

@Injectable()
export class LoginUseCase implements LoginPort {
  constructor(
    @Inject(AUTH_REPOSITORY_PORT)
    private readonly authRepository: AuthRepositoryPort,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(command: LoginCommand): Promise<LoginResult> {
    const user = await this.authRepository.findByEmail(command.email);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const valid = await bcrypt.compare(command.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Credenciales inválidas');

    const payload = { sub: user.id, email: user.email, role: user.role };

    const accessToken = this.jwtService.sign(payload);

    const refreshSecret  = this.configService.get<string>('JWT_REFRESH_SECRET') ?? 'refresh-secret';
    const refreshExpires = this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') ?? '30d';
    const refreshToken   = this.jwtService.sign(
      { ...payload, type: 'refresh' },
      { secret: refreshSecret, expiresIn: refreshExpires },
    );

    return {
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    };
  }
}
