import { FaqEntity } from '../../entities/faq.entity';

export interface GetFaqsPort {
  execute(): Promise<FaqEntity[]>;
}

export const GET_FAQS_PORT = 'GET_FAQS_PORT';
