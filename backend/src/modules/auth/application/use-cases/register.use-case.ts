import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterCommand, RegisterPort, RegisterResult } from '../../domain/ports/in/register.port';
import { AUTH_REPOSITORY_PORT, AuthRepositoryPort } from '../../domain/ports/out/auth-repository.port';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class RegisterUseCase implements RegisterPort {
  constructor(
    @Inject(AUTH_REPOSITORY_PORT)
    private readonly authRepository: AuthRepositoryPort,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: RegisterCommand): Promise<RegisterResult> {
    const existing = await this.authRepository.findByEmail(command.email);
    if (existing) throw new ConflictException('El email ya está registrado');

    const passwordHash = await bcrypt.hash(command.password, 10);

    const userEntity = new UserEntity();
    userEntity.email = command.email;
    userEntity.passwordHash = passwordHash;
    userEntity.name = command.name;
    userEntity.role = command.role;

    const saved = await this.authRepository.save(userEntity);

    const payload = { sub: saved.id, email: saved.email, role: saved.role };
    const access_token = this.jwtService.sign(payload);

    return {
      accessToken: access_token,
      user: { id: saved.id, email: saved.email, name: saved.name, role: saved.role },
    };
  }
}
