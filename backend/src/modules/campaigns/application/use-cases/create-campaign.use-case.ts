import { Inject, Injectable } from '@nestjs/common';
import { CreateCampaignPort, CreateCampaignInput } from '../../domain/ports/in/create-campaign.port';
import { CAMPAIGNS_REPOSITORY_PORT, CampaignsRepositoryPort } from '../../domain/ports/out/campaigns-repository.port';
import { CampaignEntity } from '../../domain/entities/campaign.entity';

@Injectable()
export class CreateCampaignUseCase implements CreateCampaignPort {
  constructor(
    @Inject(CAMPAIGNS_REPOSITORY_PORT)
    private readonly campaignsRepository: CampaignsRepositoryPort,
  ) {}

  async execute(input: CreateCampaignInput): Promise<CampaignEntity> {
    return this.campaignsRepository.save({
      title: input.title,
      description: input.description,
      imageUrl: input.imageUrl,
      centerId: input.centerId,
      startDate: input.startDate,
      endDate: input.endDate,
      goal: input.goal ?? 0,
      current: 0,
      active: true,
    });
  }
}
