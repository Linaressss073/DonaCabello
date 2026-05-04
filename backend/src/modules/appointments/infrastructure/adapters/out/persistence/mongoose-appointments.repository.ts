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

  async findByDonorId(donorId: string): Promise<AppointmentEntity[]> {
    const docs = await this.appointmentModel.find({ donorId }).exec();
    return docs.map((d) => this.toEntity(d));
  }

  async findByCenterId(centerId: string): Promise<AppointmentEntity[]> {
    const docs = await this.appointmentModel.find({ centerId }).exec();
    return docs.map((d) => this.toEntity(d));
  }

  async findById(id: string): Promise<AppointmentEntity | null> {
    const doc = await this.appointmentModel.findById(id).exec();
    return doc ? this.toEntity(doc) : null;
  }

  async save(appointment: AppointmentEntity): Promise<AppointmentEntity> {
    const created = await this.appointmentModel.create({
      donorId: appointment.donorId,
      centerId: appointment.centerId,
      scheduledAt: appointment.scheduledAt,
      status: appointment.status ?? 'pending',
      notes: appointment.notes,
    });
    return this.toEntity(created);
  }

  async update(id: string, partial: Partial<AppointmentEntity>): Promise<AppointmentEntity> {
    const doc = await this.appointmentModel.findByIdAndUpdate(id, partial, { new: true }).exec();
    return this.toEntity(doc!);
  }

  private toEntity(doc: AppointmentDocument): AppointmentEntity {
    const e = new AppointmentEntity();
    e.id = doc._id.toString();
    e.donorId = doc.donorId;
    e.centerId = doc.centerId;
    e.scheduledAt = doc.scheduledAt;
    e.status = doc.status as AppointmentEntity['status'];
    e.notes = doc.notes;
    e.createdAt = (doc as any).createdAt;
    e.updatedAt = (doc as any).updatedAt;
    return e;
  }
}
