import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './infrastructure/adapters/in/http/auth.controller';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { MongooseAuthRepository } from './infrastructure/adapters/out/persistence/mongoose-auth.repository';
import { UserDocument, UserSchema } from './infrastructure/adapters/out/persistence/schemas/user.schema';
import { AUTH_REPOSITORY_PORT } from './domain/ports/out/auth-repository.port';
import { LOGIN_PORT } from './domain/ports/in/login.port';
import { REGISTER_PORT } from './domain/ports/in/register.port';
import { JwtStrategy } from './infrastructure/adapters/in/http/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserDocument.name, schema: UserSchema }]),
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET', 'dona-cabello-secret'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN', '7d') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    { provide: AUTH_REPOSITORY_PORT, useClass: MongooseAuthRepository },
    { provide: LOGIN_PORT, useClass: LoginUseCase },
    { provide: REGISTER_PORT, useClass: RegisterUseCase },
    JwtStrategy,
  ],
  exports: [AUTH_REPOSITORY_PORT, JwtModule, PassportModule],
})
export class AuthModule {}
