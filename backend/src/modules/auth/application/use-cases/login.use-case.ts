import { Inject, Injectable } from '@nestjs/common';
import { LoginCommand, LoginPort, LoginResult } from '../../domain/ports/in/login.port';
import { AUTH_REPOSITORY_PORT, AuthRepositoryPort } from '../../domain/ports/out/auth-repository.port';

@Injectable()
export class LoginUseCase implements LoginPort {
  constructor(
    @Inject(AUTH_REPOSITORY_PORT)
    private readonly authRepository: AuthRepositoryPort,
  ) {}

  async execute(command: LoginCommand): Promise<LoginResult> {
    throw new Error('Not implemented');
  }
}
