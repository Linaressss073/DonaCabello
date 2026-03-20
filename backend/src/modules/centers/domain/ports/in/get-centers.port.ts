import { CenterEntity } from '../../entities/center.entity';

export interface GetCentersPort {
  execute(): Promise<CenterEntity[]>;
}

export const GET_CENTERS_PORT = 'GET_CENTERS_PORT';
