import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class RegisterCenterDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;
}
