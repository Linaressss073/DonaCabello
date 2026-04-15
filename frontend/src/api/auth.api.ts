import { apiClient } from './client';
import { USE_MOCK, mockDelay } from './mock';
import { MOCK_AUTH } from './mock.data';
import type { AuthTokens, LoginDto, RegisterDonorDto, User } from '../types';

const BASE = '/api/v1/auth';

// Tipo que devuelve el backend real
interface BackendAuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

function mapBackendResponse(res: BackendAuthResponse): AuthTokens {
  return {
    access_token: res.access_token,
    refresh_token: '',
    user: {
      id: res.user.id,
      nombre: res.user.name,
      email: res.user.email,
      telefono: '',
      rol: res.user.role.toUpperCase() as 'DONOR' | 'CENTER' | 'ADMIN',
    },
  };
}

export async function login(dto: LoginDto): Promise<AuthTokens> {
  if (USE_MOCK) {
    await mockDelay();
    localStorage.setItem('access_token', MOCK_AUTH.access_token);
    return MOCK_AUTH;
  }
  const res = await apiClient.post<BackendAuthResponse>(`${BASE}/login`, dto);
  const tokens = mapBackendResponse(res);
  localStorage.setItem('access_token', tokens.access_token);
  return tokens;
}

export async function registerDonor(dto: RegisterDonorDto): Promise<AuthTokens> {
  if (USE_MOCK) {
    await mockDelay();
    localStorage.setItem('access_token', MOCK_AUTH.access_token);
    return MOCK_AUTH;
  }
  const res = await apiClient.post<BackendAuthResponse>(`${BASE}/register`, {
    name: dto.nombre,
    email: dto.email,
    password: dto.password,
    role: 'donor',
  });
  const tokens = mapBackendResponse(res);
  localStorage.setItem('access_token', tokens.access_token);
  return tokens;
}

export async function refreshToken(token: string): Promise<AuthTokens> {
  if (USE_MOCK) {
    await mockDelay();
    return MOCK_AUTH;
  }
  return apiClient.post<AuthTokens>(`${BASE}/refresh`, { refresh_token: token });
}

export async function getMe(): Promise<User> {
  if (USE_MOCK) {
    await mockDelay();
    return MOCK_AUTH.user;
  }
  const res = await apiClient.get<BackendAuthResponse['user']>(`${BASE}/me`);
  return {
    id: res.id,
    nombre: res.name,
    email: res.email,
    telefono: '',
    rol: res.role.toUpperCase() as 'DONOR' | 'CENTER' | 'ADMIN',
  };
}

export function logout(): void {
  localStorage.removeItem('access_token');
}
