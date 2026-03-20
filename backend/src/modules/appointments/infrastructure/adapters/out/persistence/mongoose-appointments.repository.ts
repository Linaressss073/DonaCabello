import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppointmentsRepositoryPort } from '../../../../domain/ports/out/appointments-repository.port';
import { AppointmentEntity } from '../../../../domain/entities/appointment.entity';
import { AppointmentDocument } from './schemas/appointment.schema';

@Injectable()
export class MongooseAppointmentsRepository implements AppointmentsRepositoryPort {
  constructor(
    @InjectModel(AppointmentDocument.name)
    private readonly appointmentModel: Model<AppointmentDocument>,
  ) {}

  async findByDonorId(donorId: string): Promise<AppointmentEntity[]> { throw new Error('Not implemented'); }
  async findById(id: string): Promise<AppointmentEntity | null> { throw new Error('Not implemented'); }
  async save(appointment: AppointmentEntity): Promise<AppointmentEntity> { throw new Error('Not implemented'); }
  async update(id: string, partial: Partial<AppointmentEntity>): Promise<AppointmentEntity> { throw new Error('Not implemented'); }
}
