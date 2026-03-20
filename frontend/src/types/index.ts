// ─── Auth ────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  rol: 'DONOR' | 'CENTER' | 'ADMIN';
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDonorDto {
  nombre: string;
  email: string;
  telefono: string;
  password: string;
}

// ─── Centers ─────────────────────────────────────────────────────────────────

export interface Center {
  id: string;
  nombre: string;
  zona: string;
  ciudad: string;
  direccion: string;
  horarios: string;
  rating: number;
  reviews: number;
  verificado: boolean;
  servicios: string[];
  telefono: string;
  email?: string;
  lat?: number;
  lng?: number;
}

export interface CenterFilters {
  ciudad?: string;
  zona?: string;
  nombre?: string;
  soloVerificados?: boolean;
  finDeSemana?: boolean;
  horarioExtendido?: boolean;
  servicios?: string[];
}

export interface RegisterCenterDto {
  nombre: string;
  nit: string;
  email: string;
  telefono: string;
  ciudad: string;
  zona: string;
  direccion: string;
  barrio?: string;
  horarioSemana: string;
  horarioSabado?: string;
  horarioDomingo?: string;
  servicios: string[];
  responsable: string;
  cargo?: string;
  descripcion?: string;
}

// ─── Appointments / Donations ────────────────────────────────────────────────

export type AppointmentStatus = 'Agendada' | 'Realizada' | 'Confirmada' | 'Cancelada';

export interface AppointmentCenter {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
}

export interface Appointment {
  id: string;
  donante: string;
  email: string;
  telefono: string;
  centro: AppointmentCenter;
  fecha: string;
  hora: string;
  notas?: string;
  estado: AppointmentStatus;
  observacionesCorte?: string;
  creadoEn: string;
}

export interface CreateAppointmentDto {
  nombre: string;
  email: string;
  telefono: string;
  ciudad: string;
  centroId: string;
  fecha: string;
  hora: string;
  notas?: string;
}

export interface ConfirmAppointmentDto {
  observacionesCorte: string;
}

// ─── Center Panel ─────────────────────────────────────────────────────────────

export interface PanelAppointment {
  id: string;
  hora: string;
  donante: string;
  telefono: string;
  estado: AppointmentStatus;
  notas?: string;
  fecha?: string;
}

export interface CenterPanelData {
  centro: Center;
  citasHoy: PanelAppointment[];
  citasSemana: PanelAppointment[];
  estadisticas: {
    confirmadas: number;
    pendientes: number;
    totalMes: number;
  };
  proximaRecoleccion?: {
    fecha: string;
    hora: string;
    paquetes: number;
  };
}

// ─── Campaigns ───────────────────────────────────────────────────────────────

export type CampaignStatus = 'Activa' | 'Inactiva' | 'Finalizada';
export type CampaignIconTipo = 'heart' | 'users' | 'megaphone';

export interface Campaign {
  id: string;
  titulo: string;
  descripcion: string;
  estado: CampaignStatus;
  progreso?: number;
  meta?: number;
  unidad?: string;
  fechaInicio: string;
  fechaFin: string;
  participantes: number;
  tipo: 'nacional' | 'corporativo' | 'universitario';
  iconTipo: CampaignIconTipo;
}

// ─── Community ───────────────────────────────────────────────────────────────

export interface FAQ {
  id: string;
  pregunta: string;
  respuesta: string;
}

export interface Myth {
  id: string;
  mito: string;
  verdad: string;
  tipo: 'falso' | 'parcial';
}

export interface ContactDto {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

// ─── Generic API ─────────────────────────────────────────────────────────────

export interface ApiMessage {
  message: string;
}
