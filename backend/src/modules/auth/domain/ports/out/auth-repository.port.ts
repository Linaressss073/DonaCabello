import { UserEntity } from '../../entities/user.entity';

export interface AuthRepositoryPort {
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  save(user: UserEntity): Promise<UserEntity>;
}

export const AUTH_REPOSITORY_PORT = 'AUTH_REPOSITORY_PORT';
