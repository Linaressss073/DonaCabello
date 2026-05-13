import { Inject, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { DeleteCampaignPort } from '../../domain/ports/in/delete-campaign.port';
import { CAMPAIGNS_REPOSITORY_PORT, CampaignsRepositoryPort } from '../../domain/ports/out/campaigns-repository.port';
import { CentersRepositoryPort, CENTERS_REPOSITORY_PORT } from '../../../centers/domain/ports/out/centers-repository.port';

@Injectable()
export class DeleteCampaignUseCase implements DeleteCampaignPort {
  constructor(
    @Inject(CAMPAIGNS_REPOSITORY_PORT)
    private readonly campaignsRepository: CampaignsRepositoryPort,
    @Inject(CENTERS_REPOSITORY_PORT)
    private readonly centersRepository: CentersRepositoryPort,
  ) {}

  async execute(id: string, ownerId: string): Promise<void> {
    const campaign = await this.campaignsRepository.findById(id);
    if (!campaign) throw new NotFoundException('Campaña no encontrada');

    const center = await this.centersRepository.findById(campaign.centerId);
    if (!center || center.ownerId !== ownerId) throw new ForbiddenException('No tienes permiso para eliminar esta campaña');

    await this.campaignsRepository.delete(id);
  }
}
