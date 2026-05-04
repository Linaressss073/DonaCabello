import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GetCenterByIdPort } from '../../domain/ports/in/get-center-by-id.port';
import { CENTERS_REPOSITORY_PORT, CentersRepositoryPort } from '../../domain/ports/out/centers-repository.port';
import { CenterEntity } from '../../domain/entities/center.entity';

@Injectable()
export class GetCenterByIdUseCase implements GetCenterByIdPort {
  constructor(
    @Inject(CENTERS_REPOSITORY_PORT)
    private readonly centersRepository: CentersRepositoryPort,
  ) {}

  async execute(id: string): Promise<CenterEntity> {
    const center = await this.centersRepository.findById(id);
    if (!center) throw new NotFoundException('Center not found');
    return center;
  }
}