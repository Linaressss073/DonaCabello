import { ContactMessageEntity, FaqEntity, MythEntity } from '../../entities/faq.entity';

export interface CommunityRepositoryPort {
  findFaqs(): Promise<FaqEntity[]>;
  findMyths(): Promise<MythEntity[]>;
  saveContact(message: ContactMessageEntity): Promise<ContactMessageEntity>;
}

export const COMMUNITY_REPOSITORY_PORT = 'COMMUNITY_REPOSITORY_PORT';
