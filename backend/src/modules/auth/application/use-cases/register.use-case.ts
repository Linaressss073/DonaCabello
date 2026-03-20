import { Inject, Injectable } from '@nestjs/common';
import { RegisterCommand, RegisterPort, RegisterResult } from '../../domain/ports/in/register.port';
import { AUTH_REPOSITORY_PORT, AuthRepositoryPort } from '../../domain/ports/out/auth-repository.port';

@Injectable()
export class RegisterUseCase implements RegisterPort {
  constructor(
    @Inject(AUTH_REPOSITORY_PORT)
    private readonly authRepository: AuthRepositoryPort,
  ) {}

  async execute(command: RegisterCommand): Promise<RegisterResult> {
    throw new Error('Not implemented');
  }
}
