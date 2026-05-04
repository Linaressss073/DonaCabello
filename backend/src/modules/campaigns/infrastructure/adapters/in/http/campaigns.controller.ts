import { Controller, Get, Inject, Param } from '@nestjs/common';
import { GET_CAMPAIGNS_PORT, GetCampaignsPort } from '../../../../domain/ports/in/get-campaigns.port';
import { GET_CAMPAIGN_BY_ID_PORT, GetCampaignByIdPort } from '../../../../domain/ports/in/get-campaign-by-id.port';

@Controller('campaigns')
export class CampaignsController {
  constructor(
    @Inject(GET_CAMPAIGNS_PORT) private readonly getCampaignsUseCase: GetCampaignsPort,
    @Inject(GET_CAMPAIGN_BY_ID_PORT) private readonly getCampaignByIdUseCase: GetCampaignByIdPort,
  ) {}

  @Get()
  getAll() {
    return this.getCampaignsUseCase.execute();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.getCampaignByIdUseCase.execute(id);
  }
}
