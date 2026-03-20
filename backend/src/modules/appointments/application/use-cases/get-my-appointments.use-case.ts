import { Inject, Injectable } from '@nestjs/common';
import { GetMyAppointmentsPort } from '../../domain/ports/in/get-my-appointments.port';
import { APPOINTMENTS_REPOSITORY_PORT, AppointmentsRepositoryPort } from '../../domain/ports/out/appointments-repository.port';
import { AppointmentEntity } from '../../domain/entities/appointment.entity';

@Injectable()
export class GetMyAppointmentsUseCase implements GetMyAppointmentsPort {
  constructor(
    @Inject(APPOINTMENTS_REPOSITORY_PORT)
    private readonly appointmentsRepository: AppointmentsRepositoryPort,
  ) {}

  async execute(donorId: string): Promise<AppointmentEntity[]> {
    throw new Error('Not implemented');
  }
}
