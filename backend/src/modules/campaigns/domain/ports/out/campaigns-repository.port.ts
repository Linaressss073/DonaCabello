import { CampaignEntity } from '../../entities/campaign.entity';

export interface CampaignsRepositoryPort {
  findAll(): Promise<CampaignEntity[]>;
  findById(id: string): Promise<CampaignEntity | null>;
}

export const CAMPAIGNS_REPOSITORY_PORT = 'CAMPAIGNS_REPOSITORY_PORT';
