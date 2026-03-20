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

  async findAll(): Promise<CenterEntity[]> { throw new Error('Not implemented'); }
  async findById(id: string): Promise<CenterEntity | null> { throw new Error('Not implemented'); }
  async findByOwnerId(ownerId: string): Promise<CenterEntity | null> { throw new Error('Not implemented'); }
  async save(center: CenterEntity): Promise<CenterEntity> { throw new Error('Not implemented'); }
  async update(id: string, partial: Partial<CenterEntity>): Promise<CenterEntity> { throw new Error('Not implemented'); }
}
