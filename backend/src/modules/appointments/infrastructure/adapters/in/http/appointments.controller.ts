import { Body, Controller, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { GET_MY_APPOINTMENTS_PORT, GetMyAppointmentsPort } from '../../../../domain/ports/in/get-my-appointments.port';
import { CREATE_APPOINTMENT_PORT, CreateAppointmentPort } from '../../../../domain/ports/in/create-appointment.port';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(
    @Inject(GET_MY_APPOINTMENTS_PORT) private readonly getMyAppointmentsUseCase: GetMyAppointmentsPort,
    @Inject(CREATE_APPOINTMENT_PORT) private readonly createAppointmentUseCase: CreateAppointmentPort,
  ) {}

  @Get('my')
  getMy() {
    // TODO: extraer donorId del JWT
    throw new Error('Not implemented');
  }

  @Post()
  create(@Body() dto: CreateAppointmentDto) {
    // TODO: extraer donorId del JWT
    throw new Error('Not implemented');
  }

  @Patch(':id/confirm')
  confirm(@Param('id') id: string) {
    // TODO: implementar ConfirmAppointmentUseCase
    throw new Error('Not implemented');
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: string) {
    // TODO: implementar CancelAppointmentUseCase
    throw new Error('Not implemented');
  }
}
