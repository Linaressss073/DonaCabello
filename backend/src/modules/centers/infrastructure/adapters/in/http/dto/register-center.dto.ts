import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class RegisterCenterDto {
  // Frontend fields (Spanish)
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  nit?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  ciudad?: string;

  @IsOptional()
  @IsString()
  zona?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsString()
  barrio?: string;

  @IsOptional()
  @IsString()
  horarioSemana?: string;

  @IsOptional()
  @IsString()
  horarioSabado?: string;

  @IsOptional()
  @IsString()
  horarioDomingo?: string;

  @IsOptional()
  servicios?: string[];

  @IsOptional()
  @IsString()
  responsable?: string;

  @IsOptional()
  @IsString()
  cargo?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  // Original backend fields (English) kept for compatibility
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;
}
