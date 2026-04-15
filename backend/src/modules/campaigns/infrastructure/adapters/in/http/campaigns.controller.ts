import { Controller, Get, Inject, NotFoundException, Param } from '@nestjs/common';
import { GET_CAMPAIGNS_PORT, GetCampaignsPort } from '../../../../domain/ports/in/get-campaigns.port';
import { CAMPAIGNS_REPOSITORY_PORT, CampaignsRepositoryPort } from '../../../../domain/ports/out/campaigns-repository.port';

@Controller('campaigns')
export class CampaignsController {
  constructor(
    @Inject(GET_CAMPAIGNS_PORT) private readonly getCampaignsUseCase: GetCampaignsPort,
    @Inject(CAMPAIGNS_REPOSITORY_PORT) private readonly campaignsRepository: CampaignsRepositoryPort,
  ) {}

  @Get()
  getAll() {
    return this.getCampaignsUseCase.execute();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const campaign = await this.campaignsRepository.findById(id);
    if (!campaign) throw new NotFoundException('Campaña no encontrada');
    return campaign;
  }
}
