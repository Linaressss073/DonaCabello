import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCenterStatusCommand, UpdateCenterStatusPort } from '../../domain/ports/in/update-center-status.port';
import { CENTERS_REPOSITORY_PORT, CentersRepositoryPort } from '../../domain/ports/out/centers-repository.port';
import { CenterEntity } from '../../domain/entities/center.entity';

@Injectable()
export class UpdateCenterStatusUseCase implements UpdateCenterStatusPort {
  constructor(
    @Inject(CENTERS_REPOSITORY_PORT)
    private readonly centersRepository: CentersRepositoryPort,
  ) {}

  async execute(command: UpdateCenterStatusCommand): Promise<CenterEntity> {
    const center = await this.centersRepository.findById(command.id);
    if (!center) throw new NotFoundException('Center not found');
    return this.centersRepository.update(command.id, { status: command.status });
  }
}