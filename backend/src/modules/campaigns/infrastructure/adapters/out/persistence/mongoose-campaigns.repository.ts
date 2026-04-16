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
    const docs = await this.campaignModel.find().exec();
    return docs.map((d) => this.toEntity(d));
  }

  async findById(id: string): Promise<CampaignEntity | null> {
    const doc = await this.campaignModel.findById(id).exec();
    return doc ? this.toEntity(doc) : null;
  }

  private toEntity(doc: CampaignDocument): CampaignEntity {
    const e = new CampaignEntity();
    e.id = doc._id.toString();
    e.title = doc.title;
    e.description = doc.description;
    e.imageUrl = doc.imageUrl;
    e.centerId = doc.centerId;
    e.startDate = doc.startDate;
    e.endDate = doc.endDate;
    e.goal = doc.goal;
    e.current = doc.current;
    e.active = doc.active;
    e.createdAt = (doc as any).createdAt;
    e.updatedAt = (doc as any).updatedAt;
    return e;
  }
}
