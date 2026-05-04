import { AppointmentEntity } from '../../entities/appointment.entity';

export interface CancelAppointmentPort {
  execute(id: string): Promise<AppointmentEntity>;
}

export const CANCEL_APPOINTMENT_PORT = 'CANCEL_APPOINTMENT_PORT';