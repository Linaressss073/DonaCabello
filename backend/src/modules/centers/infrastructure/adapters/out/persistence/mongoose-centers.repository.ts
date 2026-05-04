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
    return docs.map((d) => this.toEntity(d));
  }

  async findById(id: string): Promise<CenterEntity | null> {
    const doc = await this.centerModel.findById(id).exec();
    return doc ? this.toEntity(doc) : null;
  }

  async findByOwnerId(ownerId: string): Promise<CenterEntity | null> {
    const doc = await this.centerModel.findOne({ ownerId }).exec();
    return doc ? this.toEntity(doc) : null;
  }

  async findAllByOwnerId(ownerId: string): Promise<CenterEntity[]> {
    const docs = await this.centerModel.find({ ownerId }).exec();
    return docs.map((d) => this.toEntity(d));
  }

  async save(center: CenterEntity): Promise<CenterEntity> {
    const created = await this.centerModel.create({
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
    return this.toEntity(created);
  }

  async update(id: string, partial: Partial<CenterEntity>): Promise<CenterEntity> {
    const doc = await this.centerModel.findByIdAndUpdate(id, partial, { new: true }).exec();
    return this.toEntity(doc!);
  }

  private toEntity(doc: CenterDocument): CenterEntity {
    const e = new CenterEntity();
    e.id = doc._id.toString();
    e.name = doc.name;
    e.address = doc.address;
    e.city = doc.city;
    e.phone = doc.phone;
    e.email = doc.email;
    e.description = doc.description;
    e.status = doc.status as CenterEntity['status'];
    e.ownerId = doc.ownerId;
    e.latitude = doc.latitude;
    e.longitude = doc.longitude;
    e.createdAt = (doc as any).createdAt;
    e.updatedAt = (doc as any).updatedAt;
    return e;
  }
}
