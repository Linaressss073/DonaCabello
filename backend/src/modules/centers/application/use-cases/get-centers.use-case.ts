import { Inject, Injectable } from '@nestjs/common';
import { GetCentersPort } from '../../domain/ports/in/get-centers.port';
import { CENTERS_REPOSITORY_PORT, CentersRepositoryPort } from '../../domain/ports/out/centers-repository.port';
import { CenterEntity } from '../../domain/entities/center.entity';

@Injectable()
export class GetCentersUseCase implements GetCentersPort {
  constructor(
    @Inject(CENTERS_REPOSITORY_PORT)
    private readonly centersRepository: CentersRepositoryPort,
  ) {}

  async execute(): Promise<CenterEntity[]> {
    return this.centersRepository.findAll();
  }
}
