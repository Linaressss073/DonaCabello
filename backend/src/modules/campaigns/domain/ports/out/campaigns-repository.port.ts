import { CampaignEntity } from '../../entities/campaign.entity';

export interface CampaignsRepositoryPort {
  findAll(): Promise<CampaignEntity[]>;
  findById(id: string): Promise<CampaignEntity | null>;
  findByCenterId(centerId: string): Promise<CampaignEntity[]>;
  save(campaign: Partial<CampaignEntity>): Promise<CampaignEntity>;
  update(id: string, partial: Partial<CampaignEntity>): Promise<CampaignEntity>;
  delete(id: string): Promise<void>;
}

export const CAMPAIGNS_REPOSITORY_PORT = 'CAMPAIGNS_REPOSITORY_PORT';
