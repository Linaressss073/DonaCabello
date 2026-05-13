export interface DeleteCampaignPort {
  execute(id: string, ownerId: string): Promise<void>;
}

export const DELETE_CAMPAIGN_PORT = 'DELETE_CAMPAIGN_PORT';
