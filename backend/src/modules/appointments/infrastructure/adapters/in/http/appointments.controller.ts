import { Body, Controller, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { GET_MY_APPOINTMENTS_PORT, GetMyAppointmentsPort } from '../../../../domain/ports/in/get-my-appointments.port';
import { CREATE_APPOINTMENT_PORT, CreateAppointmentPort } from '../../../../domain/ports/in/create-appointment.port';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { JwtAuthGuard } from '../../../../../../shared/guards/jwt-auth.guard';
import { GetUser } from '../../../../../../shared/decorators/get-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(
    @Inject(GET_MY_APPOINTMENTS_PORT) private readonly getMyAppointmentsUseCase: GetMyAppointmentsPort,
    @Inject(CREATE_APPOINTMENT_PORT) private readonly createAppointmentUseCase: CreateAppointmentPort,
  ) {}

  @Get('my')
  getMy(@GetUser() user: any) {
    return this.getMyAppointmentsUseCase.execute(user.id);
  }

  @Post()
  create(@Body() dto: CreateAppointmentDto, @GetUser() user: any) {
    return this.createAppointmentUseCase.execute({
      donorId: user.id,
      centerId: dto.centerId,
      scheduledAt: new Date(dto.scheduledAt),
      notes: dto.notes,
    });
  }

  @Patch(':id/confirm')
  confirm(@Param('id') _id: string) {
    throw new Error('Not implemented');
  }

  @Patch(':id/cancel')
  cancel(@Param('id') _id: string) {
    throw new Error('Not implemented');
  }
}
