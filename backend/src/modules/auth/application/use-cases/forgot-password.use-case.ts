import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ForgotPasswordCommand, ForgotPasswordPort } from '../../domain/ports/in/forgot-password.port';
import { AUTH_REPOSITORY_PORT, AuthRepositoryPort } from '../../domain/ports/out/auth-repository.port';
import { EmailService } from '../../../../shared/email/email.service';

@Injectable()
export class ForgotPasswordUseCase implements ForgotPasswordPort {
  private readonly logger = new Logger(ForgotPasswordUseCase.name);

  constructor(
    @Inject(AUTH_REPOSITORY_PORT)
    private readonly authRepository: AuthRepositoryPort,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  async execute(command: ForgotPasswordCommand): Promise<void> {
    const user = await this.authRepository.findByEmail(command.email);

    // Always return success to avoid email enumeration attacks
    if (!user) return;

    const token = this.jwtService.sign(
      { sub: user.id, email: user.email, type: 'password_reset' },
      { expiresIn: '1h' },
    );

    const frontendUrl = this.configService.get<string>('FRONTEND_URL') ?? 'http://localhost:3001';
    const resetUrl = `${frontendUrl}/restablecer-contrasena?token=${token}`;

    await this.emailService.sendPasswordReset({ to: user.email, name: user.name, resetUrl });
    this.logger.log(`Reset email sent to ${user.email}`);
  }
}
