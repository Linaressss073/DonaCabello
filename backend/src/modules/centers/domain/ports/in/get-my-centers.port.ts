import { CenterEntity } from '../../entities/center.entity';

export interface GetMyCentersPort {
  execute(ownerId: string): Promise<CenterEntity[]>;
}

export const GET_MY_CENTERS_PORT = 'GET_MY_CENTERS_PORT';
