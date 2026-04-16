import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ResetPasswordCommand, ResetPasswordPort } from '../../domain/ports/in/reset-password.port';
import { AUTH_REPOSITORY_PORT, AuthRepositoryPort } from '../../domain/ports/out/auth-repository.port';

@Injectable()
export class ResetPasswordUseCase implements ResetPasswordPort {
  constructor(
    @Inject(AUTH_REPOSITORY_PORT)
    private readonly authRepository: AuthRepositoryPort,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: ResetPasswordCommand): Promise<void> {
    let payload: any;
    try {
      payload = this.jwtService.verify(command.token);
    } catch {
      throw new BadRequestException('El enlace de recuperación es inválido o ha expirado');
    }

    if (payload.type !== 'password_reset') {
      throw new BadRequestException('Token inválido');
    }

    const user = await this.authRepository.findById(payload.sub);
    if (!user) throw new BadRequestException('Usuario no encontrado');

    const passwordHash = await bcrypt.hash(command.newPassword, 10);
    await this.authRepository.updatePassword(user.id, passwordHash);
  }
}
