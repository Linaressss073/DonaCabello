import { IsOptional, IsString } from 'class-validator';

export class CreateAppointmentDto {
  // Frontend sends centroId + fecha + hora
  @IsOptional()
  @IsString()
  centroId?: string;

  @IsOptional()
  @IsString()
  fecha?: string; // 'YYYY-MM-DD'

  @IsOptional()
  @IsString()
  hora?: string; // 'HH:MM'

  @IsOptional()
  @IsString()
  notas?: string;

  // Optional extra fields from the form (not stored, but accepted)
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  ciudad?: string;

  // Legacy backend fields kept for backward compat
  @IsOptional()
  @IsString()
  centerId?: string;

  @IsOptional()
  @IsString()
  scheduledAt?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
