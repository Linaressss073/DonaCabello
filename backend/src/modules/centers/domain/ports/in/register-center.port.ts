import { CenterEntity } from '../../entities/center.entity';

export interface RegisterCenterCommand {
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  description: string;
  ownerId: string;
  latitude?: number;
  longitude?: number;
}

export interface RegisterCenterPort {
  execute(command: RegisterCenterCommand): Promise<CenterEntity>;
}

export const REGISTER_CENTER_PORT = 'REGISTER_CENTER_PORT';
