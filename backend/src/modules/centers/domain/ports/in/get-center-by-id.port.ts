import { CenterEntity } from '../../entities/center.entity';

export interface GetCenterByIdPort {
  execute(id: string): Promise<CenterEntity>;
}

export const GET_CENTER_BY_ID_PORT = 'GET_CENTER_BY_ID_PORT';
