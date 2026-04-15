import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { GET_FAQS_PORT, GetFaqsPort } from '../../../../domain/ports/in/get-faqs.port';
import { SEND_CONTACT_PORT, SendContactPort } from '../../../../domain/ports/in/send-contact.port';
import { COMMUNITY_REPOSITORY_PORT, CommunityRepositoryPort } from '../../../../domain/ports/out/community-repository.port';
import { ContactDto } from './dto/contact.dto';

@Controller('community')
export class CommunityController {
  constructor(
    @Inject(GET_FAQS_PORT) private readonly getFaqsUseCase: GetFaqsPort,
    @Inject(SEND_CONTACT_PORT) private readonly sendContactUseCase: SendContactPort,
    @Inject(COMMUNITY_REPOSITORY_PORT) private readonly communityRepository: CommunityRepositoryPort,
  ) {}

  @Get('faqs')
  getFaqs() {
    return this.getFaqsUseCase.execute();
  }

  @Get('myths')
  getMyths() {
    return this.communityRepository.findMyths();
  }

  @Post('contact')
  sendContact(@Body() dto: ContactDto) {
    return this.sendContactUseCase.execute({
      name: dto.name,
      email: dto.email,
      message: dto.message,
    });
  }
}
