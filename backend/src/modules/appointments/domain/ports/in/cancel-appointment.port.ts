import { AppointmentEntity } from '../../entities/appointment.entity';

export interface CancelAppointmentPort {
  execute(appointmentId: string, donorId: string): Promise<AppointmentEntity>;
}

export const CANCEL_APPOINTMENT_PORT = 'CANCEL_APPOINTMENT_PORT';
