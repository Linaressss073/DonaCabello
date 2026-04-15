import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CentersController } from './infrastructure/adapters/in/http/centers.controller';
import { GetCentersUseCase } from './application/use-cases/get-centers.use-case';
import { RegisterCenterUseCase } from './application/use-cases/register-center.use-case';
import { MongooseCentersRepository } from './infrastructure/adapters/out/persistence/mongoose-centers.repository';
import { CenterDocument, CenterSchema } from './infrastructure/adapters/out/persistence/schemas/center.schema';
import { AppointmentDocument, AppointmentSchema } from '../appointments/infrastructure/adapters/out/persistence/schemas/appointment.schema';
import { UserDocument, UserSchema } from '../auth/infrastructure/adapters/out/persistence/schemas/user.schema';
import { CENTERS_REPOSITORY_PORT } from './domain/ports/out/centers-repository.port';
import { GET_CENTERS_PORT } from './domain/ports/in/get-centers.port';
import { REGISTER_CENTER_PORT } from './domain/ports/in/register-center.port';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CenterDocument.name, schema: CenterSchema },
      { name: AppointmentDocument.name, schema: AppointmentSchema },
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  controllers: [CentersController],
  providers: [
    { provide: CENTERS_REPOSITORY_PORT, useClass: MongooseCentersRepository },
    { provide: GET_CENTERS_PORT, useClass: GetCentersUseCase },
    { provide: REGISTER_CENTER_PORT, useClass: RegisterCenterUseCase },
  ],
  exports: [CENTERS_REPOSITORY_PORT],
})
export class CentersModule {}
