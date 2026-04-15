import { Inject, Injectable } from '@nestjs/common';
import { GetCampaignsPort } from '../../domain/ports/in/get-campaigns.port';
import { CAMPAIGNS_REPOSITORY_PORT, CampaignsRepositoryPort } from '../../domain/ports/out/campaigns-repository.port';
import { CampaignEntity } from '../../domain/entities/campaign.entity';

@Injectable()
export class GetCampaignsUseCase implements GetCampaignsPort {
  constructor(
    @Inject(CAMPAIGNS_REPOSITORY_PORT)
    private readonly campaignsRepository: CampaignsRepositoryPort,
  ) {}

  async execute(): Promise<CampaignEntity[]> {
    return this.campaignsRepository.findAll();
  }
}
