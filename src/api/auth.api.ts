import { apiClient } from './client';
import { USE_MOCK, mockDelay } from './mock';
import { MOCK_AUTH } from './mock.data';
import type { AuthTokens, LoginDto, RegisterDonorDto, User } from '../types';

const BASE = '/api/v1/auth';

export async function login(dto: LoginDto): Promise<AuthTokens> {
  if (USE_MOCK) {
    await mockDelay();
    localStorage.setItem('access_token', MOCK_AUTH.access_token);
    return MOCK_AUTH;
  }
  const tokens = await apiClient.post<AuthTokens>(`${BASE}/login`, dto);
  localStorage.setItem('access_token', tokens.access_token);
  return tokens;
}

export async function registerDonor(dto: RegisterDonorDto): Promise<AuthTokens> {
  if (USE_MOCK) {
    await mockDelay();
    localStorage.setItem('access_token', MOCK_AUTH.access_token);
    return MOCK_AUTH;
  }
  const tokens = await apiClient.post<AuthTokens>(`${BASE}/register`, dto);
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
  return apiClient.get<User>(`${BASE}/me`);
}

export function logout(): void {
  localStorage.removeItem('access_token');
}
