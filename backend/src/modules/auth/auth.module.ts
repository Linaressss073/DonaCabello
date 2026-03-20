import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './infrastructure/adapters/in/http/auth.controller';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { MongooseAuthRepository } from './infrastructure/adapters/out/persistence/mongoose-auth.repository';
import { UserDocument, UserSchema } from './infrastructure/adapters/out/persistence/schemas/user.schema';
import { AUTH_REPOSITORY_PORT } from './domain/ports/out/auth-repository.port';
import { LOGIN_PORT } from './domain/ports/in/login.port';
import { REGISTER_PORT } from './domain/ports/in/register.port';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserDocument.name, schema: UserSchema }])],
  controllers: [AuthController],
  providers: [
    { provide: AUTH_REPOSITORY_PORT, useClass: MongooseAuthRepository },
    { provide: LOGIN_PORT, useClass: LoginUseCase },
    { provide: REGISTER_PORT, useClass: RegisterUseCase },
  ],
  exports: [AUTH_REPOSITORY_PORT],
})
export class AuthModule {}
