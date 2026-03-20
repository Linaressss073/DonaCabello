import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { GET_FAQS_PORT, GetFaqsPort } from '../../../../domain/ports/in/get-faqs.port';
import { SEND_CONTACT_PORT, SendContactPort } from '../../../../domain/ports/in/send-contact.port';
import { ContactDto } from './dto/contact.dto';

@Controller('community')
export class CommunityController {
  constructor(
    @Inject(GET_FAQS_PORT) private readonly getFaqsUseCase: GetFaqsPort,
    @Inject(SEND_CONTACT_PORT) private readonly sendContactUseCase: SendContactPort,
  ) {}

  @Get('faqs')
  getFaqs() {
    return this.getFaqsUseCase.execute();
  }

  @Get('myths')
  getMyths() {
    // TODO: implementar GetMythsUseCase
    throw new Error('Not implemented');
  }

  @Post('contact')
  sendContact(@Body() dto: ContactDto) {
    return this.sendContactUseCase.execute(dto);
  }
}
