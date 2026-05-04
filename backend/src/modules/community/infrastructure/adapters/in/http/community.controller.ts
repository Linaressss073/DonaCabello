import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { GET_FAQS_PORT, GetFaqsPort } from '../../../../domain/ports/in/get-faqs.port';
import { GET_MYTHS_PORT, GetMythsPort } from '../../../../domain/ports/in/get-myths.port';
import { SEND_CONTACT_PORT, SendContactPort } from '../../../../domain/ports/in/send-contact.port';
import { ContactDto } from './dto/contact.dto';

@Controller('community')
export class CommunityController {
  constructor(
    @Inject(GET_FAQS_PORT) private readonly getFaqsUseCase: GetFaqsPort,
    @Inject(GET_MYTHS_PORT) private readonly getMythsUseCase: GetMythsPort,
    @Inject(SEND_CONTACT_PORT) private readonly sendContactUseCase: SendContactPort,
  ) {}

  @Get('faqs')
  getFaqs() {
    return this.getFaqsUseCase.execute();
  }

  @Get('myths')
  getMyths() {
    return this.getMythsUseCase.execute();
  }

  @Post('contact')
  sendContact(@Body() dto: ContactDto, @Req() req: Request) {
    const userId = (req as any).user?.sub as string | undefined;
    return this.sendContactUseCase.execute({ ...dto, userId });
  }
}
