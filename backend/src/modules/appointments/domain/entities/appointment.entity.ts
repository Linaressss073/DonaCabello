export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export class AppointmentEntity {
  id: string;
  donorId: string;
  centerId: string;
  scheduledAt: Date;
  status: AppointmentStatus;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}
