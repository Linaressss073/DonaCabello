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

  async findFaqs(): Promise<FaqEntity[]> {
    const docs = await this.faqModel.find().sort({ order: 1 }).exec();
    return docs.map((d) => ({ id: d._id.toString(), question: d.question, answer: d.answer, order: d.order }));
  }

  async findMyths(): Promise<MythEntity[]> {
    const docs = await this.mythModel.find().sort({ order: 1 }).exec();
    return docs.map((d) => ({ id: d._id.toString(), myth: d.myth, reality: d.reality, order: d.order }));
  }

  async saveContact(message: ContactMessageEntity): Promise<ContactMessageEntity> {
    const created = await this.contactModel.create({
      name: message.name,
      email: message.email,
      message: message.message,
      userId: message.userId,
    });
    return {
      id: created._id.toString(),
      name: created.name,
      email: created.email,
      message: created.message,
      createdAt: (created as any).createdAt,
      userId: created.userId,
    };
  }
}
