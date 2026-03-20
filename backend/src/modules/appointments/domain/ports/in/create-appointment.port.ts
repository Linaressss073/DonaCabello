import { AppointmentEntity } from '../../entities/appointment.entity';

export interface CreateAppointmentCommand {
  donorId: string;
  centerId: string;
  scheduledAt: Date;
  notes?: string;
}

export interface CreateAppointmentPort {
  execute(command: CreateAppointmentCommand): Promise<AppointmentEntity>;
}

export const CREATE_APPOINTMENT_PORT = 'CREATE_APPOINTMENT_PORT';
