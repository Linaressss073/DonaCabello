import { UserRole } from '../../entities/user.entity';

export interface RegisterCommand {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export interface RegisterResult {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface RegisterPort {
  execute(command: RegisterCommand): Promise<RegisterResult>;
}

export const REGISTER_PORT = 'REGISTER_PORT';
