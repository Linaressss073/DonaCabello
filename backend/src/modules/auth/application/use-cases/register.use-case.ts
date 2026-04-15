import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
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
    if (existing) throw new ConflictException('Este email ya está registrado');

    const passwordHash = await bcryptjs.hash(command.password, 10);

    const user = new UserEntity();
    user.email = command.email;
    user.passwordHash = passwordHash;
    user.name = command.name;
    user.role = command.role;

    const saved = await this.authRepository.save(user);

    const payload = { sub: saved.id, email: saved.email, role: saved.role, name: saved.name };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: { id: saved.id, email: saved.email, name: saved.name, role: saved.role },
    };
  }
}
