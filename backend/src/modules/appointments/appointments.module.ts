import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentsController } from './infrastructure/adapters/in/http/appointments.controller';
import { CreateAppointmentUseCase } from './application/use-cases/create-appointment.use-case';
import { GetMyAppointmentsUseCase } from './application/use-cases/get-my-appointments.use-case';
import { ConfirmAppointmentUseCase } from './application/use-cases/confirm-appointment.use-case';
import { CancelAppointmentUseCase } from './application/use-cases/cancel-appointment.use-case';
import { MongooseAppointmentsRepository } from './infrastructure/adapters/out/persistence/mongoose-appointments.repository';
import { AppointmentDocument, AppointmentSchema } from './infrastructure/adapters/out/persistence/schemas/appointment.schema';
import { APPOINTMENTS_REPOSITORY_PORT } from './domain/ports/out/appointments-repository.port';
import { CREATE_APPOINTMENT_PORT } from './domain/ports/in/create-appointment.port';
import { GET_MY_APPOINTMENTS_PORT } from './domain/ports/in/get-my-appointments.port';
import { CONFIRM_APPOINTMENT_PORT } from './domain/ports/in/confirm-appointment.port';
import { CANCEL_APPOINTMENT_PORT } from './domain/ports/in/cancel-appointment.port';

@Module({
  imports: [MongooseModule.forFeature([{ name: AppointmentDocument.name, schema: AppointmentSchema }])],
  controllers: [AppointmentsController],
  providers: [
    { provide: APPOINTMENTS_REPOSITORY_PORT, useClass: MongooseAppointmentsRepository },
    { provide: CREATE_APPOINTMENT_PORT, useClass: CreateAppointmentUseCase },
    { provide: GET_MY_APPOINTMENTS_PORT, useClass: GetMyAppointmentsUseCase },
    { provide: CONFIRM_APPOINTMENT_PORT, useClass: ConfirmAppointmentUseCase },
    { provide: CANCEL_APPOINTMENT_PORT, useClass: CancelAppointmentUseCase },
  ],
})
export class AppointmentsModule {}
