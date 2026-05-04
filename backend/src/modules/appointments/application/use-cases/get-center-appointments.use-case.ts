import { Inject, Injectable } from '@nestjs/common';
import { GetCenterAppointmentsPort } from '../../domain/ports/in/get-center-appointments.port';
import { APPOINTMENTS_REPOSITORY_PORT, AppointmentsRepositoryPort } from '../../domain/ports/out/appointments-repository.port';
import { CENTERS_REPOSITORY_PORT, CentersRepositoryPort } from '../../../centers/domain/ports/out/centers-repository.port';
import { AppointmentEntity } from '../../domain/entities/appointment.entity';

@Injectable()
export class GetCenterAppointmentsUseCase implements GetCenterAppointmentsPort {
  constructor(
    @Inject(APPOINTMENTS_REPOSITORY_PORT)
    private readonly appointmentsRepository: AppointmentsRepositoryPort,
    @Inject(CENTERS_REPOSITORY_PORT)
    private readonly centersRepository: CentersRepositoryPort,
  ) {}

  async execute(ownerId: string): Promise<AppointmentEntity[]> {
    const centers = await this.centersRepository.findAllByOwnerId(ownerId);
    if (!centers.length) return [];

    const results = await Promise.all(
      centers.map((c) => this.appointmentsRepository.findByCenterId(c.id)),
    );
    return results.flat();
  }
}
