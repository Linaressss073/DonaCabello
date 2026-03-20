import { apiClient } from './client';
import { USE_MOCK, mockDelay } from './mock';
import { MOCK_CENTERS, MOCK_CENTER_PANEL } from './mock.data';
import type { Center, CenterFilters, RegisterCenterDto, CenterPanelData, ApiMessage } from '../types';

const BASE = '/api/v1/centers';

export async function getCenters(filters?: CenterFilters): Promise<Center[]> {
  if (USE_MOCK) {
    await mockDelay();
    return MOCK_CENTERS;
  }
  const params = new URLSearchParams();
  if (filters?.ciudad)         params.set('ciudad', filters.ciudad);
  if (filters?.zona)           params.set('zona', filters.zona);
  if (filters?.nombre)         params.set('nombre', filters.nombre);
  if (filters?.soloVerificados) params.set('soloVerificados', 'true');
  if (filters?.finDeSemana)    params.set('finDeSemana', 'true');
  if (filters?.horarioExtendido) params.set('horarioExtendido', 'true');
  return apiClient.get<Center[]>(`${BASE}?${params}`);
}

export async function getCenterById(id: string): Promise<Center> {
  if (USE_MOCK) {
    await mockDelay();
    const center = MOCK_CENTERS.find((c) => c.id === id);
    if (!center) throw new Error('Centro no encontrado');
    return center;
  }
  return apiClient.get<Center>(`${BASE}/${id}`);
}

export async function registerCenter(dto: RegisterCenterDto): Promise<ApiMessage> {
  if (USE_MOCK) {
    await mockDelay(600);
    return { message: 'Solicitud enviada exitosamente. Revisaremos tu información en 3-5 días hábiles.' };
  }
  return apiClient.post<ApiMessage>(`${BASE}/register`, dto);
}

export async function getCenterPanel(): Promise<CenterPanelData> {
  if (USE_MOCK) {
    await mockDelay();
    return MOCK_CENTER_PANEL;
  }
  return apiClient.get<CenterPanelData>(`${BASE}/panel`);
}
