import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  centerId: string;

  @IsDateString()
  scheduledAt: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
