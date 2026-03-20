export type UserRole = 'donor' | 'center' | 'admin';

export class UserEntity {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
