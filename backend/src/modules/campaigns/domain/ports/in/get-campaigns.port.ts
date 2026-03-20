import { CampaignEntity } from '../../entities/campaign.entity';

export interface GetCampaignsPort {
  execute(): Promise<CampaignEntity[]>;
}

export const GET_CAMPAIGNS_PORT = 'GET_CAMPAIGNS_PORT';
