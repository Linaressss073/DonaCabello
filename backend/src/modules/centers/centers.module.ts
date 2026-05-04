import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CentersController } from './infrastructure/adapters/in/http/centers.controller';
import { GetCentersUseCase } from './application/use-cases/get-centers.use-case';
import { GetCenterByIdUseCase } from './application/use-cases/get-center-by-id.use-case';
import { RegisterCenterUseCase } from './application/use-cases/register-center.use-case';
import { UpdateCenterStatusUseCase } from './application/use-cases/update-center-status.use-case';
import { MongooseCentersRepository } from './infrastructure/adapters/out/persistence/mongoose-centers.repository';
import { CenterDocument, CenterSchema } from './infrastructure/adapters/out/persistence/schemas/center.schema';
import { CENTERS_REPOSITORY_PORT } from './domain/ports/out/centers-repository.port';
import { GET_CENTERS_PORT } from './domain/ports/in/get-centers.port';
import { GET_CENTER_BY_ID_PORT } from './domain/ports/in/get-center-by-id.port';
import { REGISTER_CENTER_PORT } from './domain/ports/in/register-center.port';
import { UPDATE_CENTER_STATUS_PORT } from './domain/ports/in/update-center-status.port';

@Module({
  imports: [MongooseModule.forFeature([{ name: CenterDocument.name, schema: CenterSchema }])],
  controllers: [CentersController],
  providers: [
    { provide: CENTERS_REPOSITORY_PORT, useClass: MongooseCentersRepository },
    { provide: GET_CENTERS_PORT, useClass: GetCentersUseCase },
    { provide: GET_CENTER_BY_ID_PORT, useClass: GetCenterByIdUseCase },
    { provide: REGISTER_CENTER_PORT, useClass: RegisterCenterUseCase },
    { provide: UPDATE_CENTER_STATUS_PORT, useClass: UpdateCenterStatusUseCase },
  ],
})
export class CentersModule {}
