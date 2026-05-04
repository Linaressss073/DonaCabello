import { AppointmentEntity } from '../../entities/appointment.entity';

export interface GetCenterAppointmentsPort {
  execute(centerId: string): Promise<AppointmentEntity[]>;
}

export const GET_CENTER_APPOINTMENTS_PORT = 'GET_CENTER_APPOINTMENTS_PORT';
