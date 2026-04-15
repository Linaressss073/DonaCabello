import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CampaignsRepositoryPort } from '../../../../domain/ports/out/campaigns-repository.port';
import { CampaignEntity } from '../../../../domain/entities/campaign.entity';
import { CampaignDocument } from './schemas/campaign.schema';

@Injectable()
export class MongooseCampaignsRepository implements CampaignsRepositoryPort {
  constructor(
    @InjectModel(CampaignDocument.name)
    private readonly campaignModel: Model<CampaignDocument>,
  ) {}

  async findAll(): Promise<CampaignEntity[]> {
    const docs = await this.campaignModel.find({ active: true }).sort({ createdAt: -1 }).exec();
    return docs.map(this.toEntity);
  }

  async findById(id: string): Promise<CampaignEntity | null> {
    const doc = await this.campaignModel.findById(id).exec();
    return doc ? this.toEntity(doc) : null;
  }

  private toEntity(doc: CampaignDocument): CampaignEntity {
    const entity = new CampaignEntity();
    entity.id = (doc._id as any).toString();
    entity.title = doc.title;
    entity.description = doc.description;
    entity.imageUrl = doc.imageUrl;
    entity.centerId = doc.centerId;
    entity.startDate = doc.startDate;
    entity.endDate = doc.endDate;
    entity.goal = doc.goal;
    entity.current = doc.current;
    entity.active = doc.active;
    entity.createdAt = (doc as any).createdAt;
    entity.updatedAt = (doc as any).updatedAt;
    return entity;
  }
}
