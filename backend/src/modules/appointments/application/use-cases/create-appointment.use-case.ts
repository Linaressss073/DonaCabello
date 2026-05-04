import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateAppointmentCommand, CreateAppointmentPort } from '../../domain/ports/in/create-appointment.port';
import { APPOINTMENTS_REPOSITORY_PORT, AppointmentsRepositoryPort } from '../../domain/ports/out/appointments-repository.port';
import { AppointmentEntity } from '../../domain/entities/appointment.entity';

@Injectable()
export class CreateAppointmentUseCase implements CreateAppointmentPort {
  constructor(
    @Inject(APPOINTMENTS_REPOSITORY_PORT)
    private readonly appointmentsRepository: AppointmentsRepositoryPort,
  ) {}

  async execute(command: CreateAppointmentCommand): Promise<AppointmentEntity> {
    if (command.scheduledAt <= new Date()) {
      throw new BadRequestException('La fecha de la cita debe ser en el futuro');
    }

    const appointment = new AppointmentEntity();
    appointment.donorId = command.donorId;
    appointment.centerId = command.centerId;
    appointment.scheduledAt = command.scheduledAt;
    appointment.notes = command.notes ?? '';
    appointment.status = 'pending';
    return this.appointmentsRepository.save(appointment);
  }
}
