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
    const docs = await this.campaignModel.find().sort({ createdAt: -1 }).exec();
    return docs.map((d) => this.toEntity(d));
  }

  async findById(id: string): Promise<CampaignEntity | null> {
    const doc = await this.campaignModel.findById(id).exec();
    return doc ? this.toEntity(doc) : null;
  }

  async findByCenterId(centerId: string): Promise<CampaignEntity[]> {
    const docs = await this.campaignModel.find({ centerId }).sort({ createdAt: -1 }).exec();
    return docs.map((d) => this.toEntity(d));
  }

  async save(campaign: Partial<CampaignEntity>): Promise<CampaignEntity> {
    const created = await this.campaignModel.create(campaign);
    return this.toEntity(created);
  }

  async update(id: string, partial: Partial<CampaignEntity>): Promise<CampaignEntity> {
    const doc = await this.campaignModel.findByIdAndUpdate(id, partial, { new: true }).exec();
    return this.toEntity(doc!);
  }

  async delete(id: string): Promise<void> {
    await this.campaignModel.findByIdAndDelete(id).exec();
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
