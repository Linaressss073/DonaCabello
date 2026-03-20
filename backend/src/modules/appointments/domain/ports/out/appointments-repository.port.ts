import { AppointmentEntity } from '../../entities/appointment.entity';

export interface AppointmentsRepositoryPort {
  findByDonorId(donorId: string): Promise<AppointmentEntity[]>;
  findById(id: string): Promise<AppointmentEntity | null>;
  save(appointment: AppointmentEntity): Promise<AppointmentEntity>;
  update(id: string, partial: Partial<AppointmentEntity>): Promise<AppointmentEntity>;
}

export const APPOINTMENTS_REPOSITORY_PORT = 'APPOINTMENTS_REPOSITORY_PORT';
