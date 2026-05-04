import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CancelAppointmentPort } from '../../domain/ports/in/cancel-appointment.port';
import { APPOINTMENTS_REPOSITORY_PORT, AppointmentsRepositoryPort } from '../../domain/ports/out/appointments-repository.port';
import { AppointmentEntity } from '../../domain/entities/appointment.entity';

@Injectable()
export class CancelAppointmentUseCase implements CancelAppointmentPort {
  constructor(
    @Inject(APPOINTMENTS_REPOSITORY_PORT)
    private readonly appointmentsRepository: AppointmentsRepositoryPort,
  ) {}

  async execute(id: string): Promise<AppointmentEntity> {
    const appointment = await this.appointmentsRepository.findById(id);
    if (!appointment) throw new NotFoundException('Appointment not found');
    return this.appointmentsRepository.update(id, { status: 'cancelled' });
  }
}