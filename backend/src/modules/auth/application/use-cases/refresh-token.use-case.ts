import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenCommand, RefreshTokenPort, RefreshTokenResult } from '../../domain/ports/in/refresh-token.port';
import { AUTH_REPOSITORY_PORT, AuthRepositoryPort } from '../../domain/ports/out/auth-repository.port';

@Injectable()
export class RefreshTokenUseCase implements RefreshTokenPort {
  constructor(
    @Inject(AUTH_REPOSITORY_PORT)
    private readonly authRepository: AuthRepositoryPort,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(command: RefreshTokenCommand): Promise<RefreshTokenResult> {
    const secret = this.configService.get<string>('JWT_REFRESH_SECRET') ?? 'refresh-secret';

    let payload: any;
    try {
      payload = this.jwtService.verify(command.refreshToken, { secret });
    } catch {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }

    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('Token inválido');
    }

    const user = await this.authRepository.findById(payload.sub);
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const accessToken = this.jwtService.sign(
      { sub: user.id, email: user.email, role: user.role },
    );

    const refreshToken = this.jwtService.sign(
      { sub: user.id, email: user.email, role: user.role, type: 'refresh' },
      { secret, expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') ?? '30d' },
    );

    return { accessToken, refreshToken };
  }
}