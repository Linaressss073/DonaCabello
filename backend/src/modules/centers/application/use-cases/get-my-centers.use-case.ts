import { Inject, Injectable } from '@nestjs/common';
import { GetMyCentersPort } from '../../domain/ports/in/get-my-centers.port';
import { CENTERS_REPOSITORY_PORT, CentersRepositoryPort } from '../../domain/ports/out/centers-repository.port';
import { CenterEntity } from '../../domain/entities/center.entity';

@Injectable()
export class GetMyCentersUseCase implements GetMyCentersPort {
  constructor(
    @Inject(CENTERS_REPOSITORY_PORT)
    private readonly centersRepository: CentersRepositoryPort,
  ) {}

  async execute(ownerId: string): Promise<CenterEntity[]> {
    return this.centersRepository.findAllByOwnerId(ownerId);
  }
}
