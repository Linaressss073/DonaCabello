import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CentersRepositoryPort } from '../../../../domain/ports/out/centers-repository.port';
import { CenterEntity } from '../../../../domain/entities/center.entity';
import { CenterDocument } from './schemas/center.schema';

@Injectable()
export class MongooseCentersRepository implements CentersRepositoryPort {
  constructor(
    @InjectModel(CenterDocument.name)
    private readonly centerModel: Model<CenterDocument>,
  ) {}

  async findAll(): Promise<CenterEntity[]> {
    const docs = await this.centerModel.find().exec();
    return docs.map(this.toEntity);
  }

  async findById(id: string): Promise<CenterEntity | null> {
    const doc = await this.centerModel.findById(id).exec();
    return doc ? this.toEntity(doc) : null;
  }

  async findByOwnerId(ownerId: string): Promise<CenterEntity | null> {
    const doc = await this.centerModel.findOne({ ownerId }).exec();
    return doc ? this.toEntity(doc) : null;
  }

  async save(center: CenterEntity): Promise<CenterEntity> {
    const created = new this.centerModel({
      name: center.name,
      address: center.address,
      city: center.city,
      phone: center.phone,
      email: center.email,
      description: center.description,
      status: center.status ?? 'pending',
      ownerId: center.ownerId,
      latitude: center.latitude,
      longitude: center.longitude,
    });
    const saved = await created.save();
    return this.toEntity(saved);
  }

  async update(id: string, partial: Partial<CenterEntity>): Promise<CenterEntity> {
    const updated = await this.centerModel
      .findByIdAndUpdate(id, { $set: partial }, { new: true })
      .exec();
    if (!updated) throw new Error(`Center ${id} not found`);
    return this.toEntity(updated);
  }

  private toEntity(doc: CenterDocument): CenterEntity {
    const entity = new CenterEntity();
    entity.id = (doc._id as any).toString();
    entity.name = doc.name;
    entity.address = doc.address;
    entity.city = doc.city;
    entity.phone = doc.phone;
    entity.email = doc.email;
    entity.description = doc.description;
    entity.status = doc.status as any;
    entity.ownerId = doc.ownerId;
    entity.latitude = doc.latitude;
    entity.longitude = doc.longitude;
    entity.createdAt = (doc as any).createdAt;
    entity.updatedAt = (doc as any).updatedAt;
    return entity;
  }
}
