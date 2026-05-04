import { MythEntity } from '../../entities/faq.entity';

export interface GetMythsPort {
  execute(): Promise<MythEntity[]>;
}

export const GET_MYTHS_PORT = 'GET_MYTHS_PORT';
