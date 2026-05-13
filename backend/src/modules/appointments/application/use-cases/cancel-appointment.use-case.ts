import { Inject, Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { CancelAppointmentPort } from '../../domain/ports/in/cancel-appointment.port';
import { APPOINTMENTS_REPOSITORY_PORT, AppointmentsRepositoryPort } from '../../domain/ports/out/appointments-repository.port';
import { AppointmentEntity } from '../../domain/entities/appointment.entity';

@Injectable()
export class CancelAppointmentUseCase implements CancelAppointmentPort {
  constructor(
    @Inject(APPOINTMENTS_REPOSITORY_PORT)
    private readonly appointmentsRepository: AppointmentsRepositoryPort,
  ) {}

  async execute(appointmentId: string, donorId: string): Promise<AppointmentEntity> {
    const appointment = await this.appointmentsRepository.findById(appointmentId);
    if (!appointment) throw new NotFoundException('Cita no encontrada');
    if (appointment.donorId !== donorId) throw new ForbiddenException('No tienes permiso para cancelar esta cita');
    if (appointment.status === 'cancelled') throw new BadRequestException('La cita ya está cancelada');
    if (appointment.status === 'completed') throw new BadRequestException('No se puede cancelar una cita completada');
    return this.appointmentsRepository.update(appointmentId, { status: 'cancelled' });
  }
}
