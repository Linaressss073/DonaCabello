import { AppointmentEntity } from '../../entities/appointment.entity';

export interface ConfirmAppointmentPort {
  execute(id: string): Promise<AppointmentEntity>;
}

export const CONFIRM_APPOINTMENT_PORT = 'CONFIRM_APPOINTMENT_PORT';