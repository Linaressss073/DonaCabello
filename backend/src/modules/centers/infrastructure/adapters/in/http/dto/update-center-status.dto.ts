import { IsEnum } from 'class-validator';
import { CenterStatus } from '../../../../../domain/entities/center.entity';

export class UpdateCenterStatusDto {
  @IsEnum(['pending', 'verified', 'rejected'])
  status: CenterStatus;
}
