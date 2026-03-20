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

  async findAll(): Promise<CampaignEntity[]> { throw new Error('Not implemented'); }
  async findById(id: string): Promise<CampaignEntity | null> { throw new Error('Not implemented'); }
}
