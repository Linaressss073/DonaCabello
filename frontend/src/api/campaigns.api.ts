import { apiClient } from './client';
import { USE_MOCK, mockDelay } from './mock';
import { MOCK_CAMPAIGNS } from './mock.data';
import type { Campaign } from '../types';

const BASE = '/api/v1/campaigns';

export async function getCampaigns(): Promise<Campaign[]> {
  if (USE_MOCK) {
    await mockDelay();
    return MOCK_CAMPAIGNS;
  }
  return apiClient.get<Campaign[]>(BASE);
}

export async function getCampaignById(id: string): Promise<Campaign> {
  if (USE_MOCK) {
    await mockDelay();
    const campaign = MOCK_CAMPAIGNS.find((c) => c.id === id);
    if (!campaign) throw new Error('Campaña no encontrada');
    return campaign;
  }
  return apiClient.get<Campaign>(`${BASE}/${id}`);
}
