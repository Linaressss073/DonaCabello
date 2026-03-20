import { AppointmentEntity } from '../../entities/appointment.entity';

export interface GetMyAppointmentsPort {
  execute(donorId: string): Promise<AppointmentEntity[]>;
}

export const GET_MY_APPOINTMENTS_PORT = 'GET_MY_APPOINTMENTS_PORT';
