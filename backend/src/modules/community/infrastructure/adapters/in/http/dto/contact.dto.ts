import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class ContactDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10)
  message: string;

  @IsOptional()
  @IsString()
  userId?: string;
}
