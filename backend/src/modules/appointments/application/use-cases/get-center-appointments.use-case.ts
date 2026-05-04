import { Inject, Injectable } from '@nestjs/common';
import { GetCenterAppointmentsPort } from '../../domain/ports/in/get-center-appointments.port';
import { APPOINTMENTS_REPOSITORY_PORT, AppointmentsRepositoryPort } from '../../domain/ports/out/appointments-repository.port';
import { AppointmentEntity } from '../../domain/entities/appointment.entity';

@Injectable()
export class GetCenterAppointmentsUseCase implements GetCenterAppointmentsPort {
  constructor(
    @Inject(APPOINTMENTS_REPOSITORY_PORT)
    private readonly appointmentsRepository: AppointmentsRepositoryPort,
  ) {}

  async execute(centerId: string): Promise<AppointmentEntity[]> {
    return this.appointmentsRepository.findByCenterId(centerId);
  }
}
