import { apiClient } from './client';
import { USE_MOCK, mockDelay } from './mock';
import { MOCK_MY_APPOINTMENT } from './mock.data';
import type { Appointment, CreateAppointmentDto, ConfirmAppointmentDto, ApiMessage } from '../types';

const BASE = '/api/v1/appointments';

export async function getMyAppointments(): Promise<Appointment[]> {
  if (USE_MOCK) {
    await mockDelay();
    return [MOCK_MY_APPOINTMENT];
  }
  return apiClient.get<Appointment[]>(`${BASE}/my`);
}

export async function getAppointmentById(id: string): Promise<Appointment> {
  if (USE_MOCK) {
    await mockDelay();
    return MOCK_MY_APPOINTMENT;
  }
  return apiClient.get<Appointment>(`${BASE}/${id}`);
}

export async function createAppointment(dto: CreateAppointmentDto): Promise<Appointment> {
  if (USE_MOCK) {
    await mockDelay(600);
    return {
      ...MOCK_MY_APPOINTMENT,
      id: `DON-${Date.now()}`,
      donante: dto.nombre,
      email: dto.email,
      telefono: dto.telefono,
      fecha: dto.fecha,
      hora: dto.hora,
      notas: dto.notas,
      estado: 'Agendada',
      creadoEn: new Date().toISOString(),
    };
  }
  return apiClient.post<Appointment>(BASE, dto);
}

export async function confirmAppointment(id: string, dto: ConfirmAppointmentDto): Promise<Appointment> {
  if (USE_MOCK) {
    await mockDelay(400);
    return { ...MOCK_MY_APPOINTMENT, id, estado: 'Confirmada', observacionesCorte: dto.observacionesCorte };
  }
  return apiClient.patch<Appointment>(`${BASE}/${id}/confirm`, dto);
}

export async function cancelAppointment(id: string): Promise<ApiMessage> {
  if (USE_MOCK) {
    await mockDelay(400);
    return { message: 'Cita cancelada exitosamente' };
  }
  return apiClient.patch<ApiMessage>(`${BASE}/${id}/cancel`, {});
}
