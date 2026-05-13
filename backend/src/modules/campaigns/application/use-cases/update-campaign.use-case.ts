import { Inject, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { UpdateCampaignPort, UpdateCampaignInput } from '../../domain/ports/in/update-campaign.port';
import { CAMPAIGNS_REPOSITORY_PORT, CampaignsRepositoryPort } from '../../domain/ports/out/campaigns-repository.port';
import { CampaignEntity } from '../../domain/entities/campaign.entity';
import { CentersRepositoryPort, CENTERS_REPOSITORY_PORT } from '../../../centers/domain/ports/out/centers-repository.port';

@Injectable()
export class UpdateCampaignUseCase implements UpdateCampaignPort {
  constructor(
    @Inject(CAMPAIGNS_REPOSITORY_PORT)
    private readonly campaignsRepository: CampaignsRepositoryPort,
    @Inject(CENTERS_REPOSITORY_PORT)
    private readonly centersRepository: CentersRepositoryPort,
  ) {}

  async execute(id: string, ownerId: string, input: UpdateCampaignInput): Promise<CampaignEntity> {
    const campaign = await this.campaignsRepository.findById(id);
    if (!campaign) throw new NotFoundException('Campaña no encontrada');

    const center = await this.centersRepository.findById(campaign.centerId);
    if (!center || center.ownerId !== ownerId) throw new ForbiddenException('No tienes permiso para editar esta campaña');

    const updates: Partial<CampaignEntity> = {};
    if (input.title !== undefined) updates.title = input.title;
    if (input.description !== undefined) updates.description = input.description;
    if (input.imageUrl !== undefined) updates.imageUrl = input.imageUrl;
    if (input.startDate !== undefined) updates.startDate = input.startDate;
    if (input.endDate !== undefined) updates.endDate = input.endDate;
    if (input.goal !== undefined) updates.goal = input.goal;
    if (input.current !== undefined) updates.current = input.current;
    if (input.active !== undefined) updates.active = input.active;

    return this.campaignsRepository.update(id, updates);
  }
}
