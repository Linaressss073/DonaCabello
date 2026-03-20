import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommunityController } from './infrastructure/adapters/in/http/community.controller';
import { GetFaqsUseCase } from './application/use-cases/get-faqs.use-case';
import { SendContactUseCase } from './application/use-cases/send-contact.use-case';
import { MongooseCommunityRepository } from './infrastructure/adapters/out/persistence/mongoose-community.repository';
import { ContactDocument, ContactSchema, FaqDocument, FaqSchema, MythDocument, MythSchema } from './infrastructure/adapters/out/persistence/schemas/faq.schema';
import { COMMUNITY_REPOSITORY_PORT } from './domain/ports/out/community-repository.port';
import { GET_FAQS_PORT } from './domain/ports/in/get-faqs.port';
import { SEND_CONTACT_PORT } from './domain/ports/in/send-contact.port';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FaqDocument.name, schema: FaqSchema },
      { name: MythDocument.name, schema: MythSchema },
      { name: ContactDocument.name, schema: ContactSchema },
    ]),
  ],
  controllers: [CommunityController],
  providers: [
    { provide: COMMUNITY_REPOSITORY_PORT, useClass: MongooseCommunityRepository },
    { provide: GET_FAQS_PORT, useClass: GetFaqsUseCase },
    { provide: SEND_CONTACT_PORT, useClass: SendContactUseCase },
  ],
})
export class CommunityModule {}
