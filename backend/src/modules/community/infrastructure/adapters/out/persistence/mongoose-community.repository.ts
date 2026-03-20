import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommunityRepositoryPort } from '../../../../domain/ports/out/community-repository.port';
import { ContactMessageEntity, FaqEntity, MythEntity } from '../../../../domain/entities/faq.entity';
import { ContactDocument, FaqDocument, MythDocument } from './schemas/faq.schema';

@Injectable()
export class MongooseCommunityRepository implements CommunityRepositoryPort {
  constructor(
    @InjectModel(FaqDocument.name) private readonly faqModel: Model<FaqDocument>,
    @InjectModel(MythDocument.name) private readonly mythModel: Model<MythDocument>,
    @InjectModel(ContactDocument.name) private readonly contactModel: Model<ContactDocument>,
  ) {}

  async findFaqs(): Promise<FaqEntity[]> { throw new Error('Not implemented'); }
  async findMyths(): Promise<MythEntity[]> { throw new Error('Not implemented'); }
  async saveContact(message: ContactMessageEntity): Promise<ContactMessageEntity> { throw new Error('Not implemented'); }
}
