import { CampaignEntity } from '../../entities/campaign.entity';

export interface UpdateCampaignInput {
  title?: string;
  description?: string;
  imageUrl?: string;
  startDate?: Date;
  endDate?: Date;
  goal?: number;
  current?: number;
  active?: boolean;
}

export interface UpdateCampaignPort {
  execute(id: string, ownerId: string, input: UpdateCampaignInput): Promise<CampaignEntity>;
}

export const UPDATE_CAMPAIGN_PORT = 'UPDATE_CAMPAIGN_PORT';
