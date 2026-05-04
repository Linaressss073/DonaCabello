import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GetCampaignByIdPort } from '../../domain/ports/in/get-campaign-by-id.port';
import { CAMPAIGNS_REPOSITORY_PORT, CampaignsRepositoryPort } from '../../domain/ports/out/campaigns-repository.port';
import { CampaignEntity } from '../../domain/entities/campaign.entity';

@Injectable()
export class GetCampaignByIdUseCase implements GetCampaignByIdPort {
  constructor(
    @Inject(CAMPAIGNS_REPOSITORY_PORT)
    private readonly campaignsRepository: CampaignsRepositoryPort,
  ) {}

  async execute(id: string): Promise<CampaignEntity> {
    const campaign = await this.campaignsRepository.findById(id);
    if (!campaign) throw new NotFoundException('Campaign not found');
    return campaign;
  }
}