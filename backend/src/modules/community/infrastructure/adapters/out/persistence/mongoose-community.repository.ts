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
    return docs.map((doc) => ({
      id: (doc._id as any).toString(),
      question: doc.question,
      answer: doc.answer,
      order: doc.order,
    }));
  }

  async findMyths(): Promise<MythEntity[]> {
    const docs = await this.mythModel.find().sort({ order: 1 }).exec();
    return docs.map((doc) => ({
      id: (doc._id as any).toString(),
      myth: doc.myth,
      reality: doc.reality,
      order: doc.order,
    }));
  }

  async saveContact(message: ContactMessageEntity): Promise<ContactMessageEntity> {
    const created = new this.contactModel({
      name: message.name,
      email: message.email,
      message: message.message,
    });
    const saved = await created.save();
    return {
      id: (saved._id as any).toString(),
      name: saved.name,
      email: saved.email,
      message: saved.message,
      createdAt: (saved as any).createdAt,
    };
  }
}
