import { Controller, Get, Inject, Param } from '@nestjs/common';
import { GET_CAMPAIGNS_PORT, GetCampaignsPort } from '../../../../domain/ports/in/get-campaigns.port';

@Controller('campaigns')
export class CampaignsController {
  constructor(
    @Inject(GET_CAMPAIGNS_PORT) private readonly getCampaignsUseCase: GetCampaignsPort,
  ) {}

  @Get()
  getAll() {
    return this.getCampaignsUseCase.execute();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    // TODO: implementar GetCampaignByIdUseCase
    throw new Error('Not implemented');
  }
}
