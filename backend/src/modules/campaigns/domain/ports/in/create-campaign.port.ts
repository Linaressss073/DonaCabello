import { CampaignEntity } from '../../entities/campaign.entity';

export interface CreateCampaignInput {
  title: string;
  description?: string;
  imageUrl?: string;
  centerId: string;
  startDate?: Date;
  endDate?: Date;
  goal?: number;
}

export interface CreateCampaignPort {
  execute(input: CreateCampaignInput): Promise<CampaignEntity>;
}

export const CREATE_CAMPAIGN_PORT = 'CREATE_CAMPAIGN_PORT';
