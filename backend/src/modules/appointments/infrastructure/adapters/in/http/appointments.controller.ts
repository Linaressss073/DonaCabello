import { Body, Controller, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { GET_MY_APPOINTMENTS_PORT, GetMyAppointmentsPort } from '../../../../domain/ports/in/get-my-appointments.port';
import { CREATE_APPOINTMENT_PORT, CreateAppointmentPort } from '../../../../domain/ports/in/create-appointment.port';
import { CONFIRM_APPOINTMENT_PORT, ConfirmAppointmentPort } from '../../../../domain/ports/in/confirm-appointment.port';
import { CANCEL_APPOINTMENT_PORT, CancelAppointmentPort } from '../../../../domain/ports/in/cancel-appointment.port';
import { GET_CENTER_APPOINTMENTS_PORT, GetCenterAppointmentsPort } from '../../../../domain/ports/in/get-center-appointments.port';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { JwtAuthGuard } from '../../../../../../shared/guards/jwt-auth.guard';
import { GetUser } from '../../../../../../shared/decorators/get-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(
    @Inject(GET_MY_APPOINTMENTS_PORT) private readonly getMyAppointmentsUseCase: GetMyAppointmentsPort,
    @Inject(CREATE_APPOINTMENT_PORT) private readonly createAppointmentUseCase: CreateAppointmentPort,
    @Inject(CONFIRM_APPOINTMENT_PORT) private readonly confirmAppointmentUseCase: ConfirmAppointmentPort,
    @Inject(CANCEL_APPOINTMENT_PORT) private readonly cancelAppointmentUseCase: CancelAppointmentPort,
    @Inject(GET_CENTER_APPOINTMENTS_PORT) private readonly getCenterAppointmentsUseCase: GetCenterAppointmentsPort,
  ) {}

  @Get('my')
  getMy(@GetUser() user: any) {
    return this.getMyAppointmentsUseCase.execute(user.id);
  }

  @Get('center/my')
  getCenterAppointments(@GetUser() user: any) {
    return this.getCenterAppointmentsUseCase.execute(user.id);
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
  confirm(@Param('id') id: string) {
    return this.confirmAppointmentUseCase.execute(id);
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: string, @GetUser() user: any) {
    return this.cancelAppointmentUseCase.execute(id, user.id);
  }
}
