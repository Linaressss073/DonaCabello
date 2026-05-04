import { CampaignEntity } from '../../entities/campaign.entity';

export interface GetCampaignByIdPort {
  execute(id: string): Promise<CampaignEntity>;
}

export const GET_CAMPAIGN_BY_ID_PORT = 'GET_CAMPAIGN_BY_ID_PORT';
