import { apiClient } from './client';
import { USE_MOCK, mockDelay } from './mock';
import { MOCK_FAQS, MOCK_MYTHS } from './mock.data';
import type { FAQ, Myth, ContactDto, ApiMessage } from '../types';

const BASE = '/api/v1/community';

export async function getFaqs(): Promise<FAQ[]> {
  if (USE_MOCK) {
    await mockDelay();
    return MOCK_FAQS;
  }
  return apiClient.get<FAQ[]>(`${BASE}/faqs`);
}

export async function getMyths(): Promise<Myth[]> {
  if (USE_MOCK) {
    await mockDelay();
    return MOCK_MYTHS;
  }
  return apiClient.get<Myth[]>(`${BASE}/myths`);
}

export async function sendContactMessage(dto: ContactDto): Promise<ApiMessage> {
  if (USE_MOCK) {
    await mockDelay(600);
    return { message: 'Mensaje enviado correctamente. Te responderemos en menos de 24 horas.' };
  }
  return apiClient.post<ApiMessage>(`${BASE}/contact`, dto);
}
