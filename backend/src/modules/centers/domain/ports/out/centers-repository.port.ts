import { CenterEntity } from '../../entities/center.entity';

export interface CentersRepositoryPort {
  findAll(): Promise<CenterEntity[]>;
  findById(id: string): Promise<CenterEntity | null>;
  findByOwnerId(ownerId: string): Promise<CenterEntity | null>;
  findAllByOwnerId(ownerId: string): Promise<CenterEntity[]>;
  save(center: CenterEntity): Promise<CenterEntity>;
  update(id: string, partial: Partial<CenterEntity>): Promise<CenterEntity>;
}

export const CENTERS_REPOSITORY_PORT = 'CENTERS_REPOSITORY_PORT';
