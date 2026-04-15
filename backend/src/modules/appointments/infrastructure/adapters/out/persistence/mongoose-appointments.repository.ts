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
    const docs = await this.appointmentModel.find({ donorId }).sort({ scheduledAt: -1 }).exec();
    return docs.map(this.toEntity);
  }

  async findByCenterId(centerId: string): Promise<AppointmentEntity[]> {
    const docs = await this.appointmentModel.find({ centerId }).sort({ scheduledAt: 1 }).exec();
    return docs.map(this.toEntity);
  }

  async findById(id: string): Promise<AppointmentEntity | null> {
    const doc = await this.appointmentModel.findById(id).exec();
    return doc ? this.toEntity(doc) : null;
  }

  async save(appointment: AppointmentEntity): Promise<AppointmentEntity> {
    const created = new this.appointmentModel({
      donorId: appointment.donorId,
      centerId: appointment.centerId,
      scheduledAt: appointment.scheduledAt,
      status: appointment.status ?? 'pending',
      notes: appointment.notes,
    });
    const saved = await created.save();
    return this.toEntity(saved);
  }

  async update(id: string, partial: Partial<AppointmentEntity>): Promise<AppointmentEntity> {
    const updated = await this.appointmentModel
      .findByIdAndUpdate(id, { $set: partial }, { new: true })
      .exec();
    if (!updated) throw new Error(`Appointment ${id} not found`);
    return this.toEntity(updated);
  }

  private toEntity(doc: AppointmentDocument): AppointmentEntity {
    const entity = new AppointmentEntity();
    entity.id = (doc._id as any).toString();
    entity.donorId = doc.donorId;
    entity.centerId = doc.centerId;
    entity.scheduledAt = doc.scheduledAt;
    entity.status = doc.status as any;
    entity.notes = doc.notes;
    entity.createdAt = (doc as any).createdAt;
    entity.updatedAt = (doc as any).updatedAt;
    return entity;
  }
}
