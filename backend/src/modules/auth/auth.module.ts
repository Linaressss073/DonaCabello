import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './infrastructure/adapters/in/http/auth.controller';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { ForgotPasswordUseCase } from './application/use-cases/forgot-password.use-case';
import { ResetPasswordUseCase } from './application/use-cases/reset-password.use-case';
import { MongooseAuthRepository } from './infrastructure/adapters/out/persistence/mongoose-auth.repository';
import { UserDocument, UserSchema } from './infrastructure/adapters/out/persistence/schemas/user.schema';
import { AUTH_REPOSITORY_PORT } from './domain/ports/out/auth-repository.port';
import { LOGIN_PORT } from './domain/ports/in/login.port';
import { REGISTER_PORT } from './domain/ports/in/register.port';
import { FORGOT_PASSWORD_PORT } from './domain/ports/in/forgot-password.port';
import { RESET_PASSWORD_PORT } from './domain/ports/in/reset-password.port';
import { JwtStrategy } from '../../shared/strategies/jwt.strategy';
import { EmailModule } from '../../shared/email/email.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserDocument.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') ?? '7d' },
      }),
    }),
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [
    { provide: AUTH_REPOSITORY_PORT, useClass: MongooseAuthRepository },
    { provide: LOGIN_PORT, useClass: LoginUseCase },
    { provide: REGISTER_PORT, useClass: RegisterUseCase },
    { provide: FORGOT_PASSWORD_PORT, useClass: ForgotPasswordUseCase },
    { provide: RESET_PASSWORD_PORT, useClass: ResetPasswordUseCase },
    JwtStrategy,
  ],
  exports: [AUTH_REPOSITORY_PORT, JwtModule],
})
export class AuthModule {}
