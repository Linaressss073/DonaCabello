import { Inject, Injectable } from '@nestjs/common';
import { GetMythsPort } from '../../domain/ports/in/get-myths.port';
import { COMMUNITY_REPOSITORY_PORT, CommunityRepositoryPort } from '../../domain/ports/out/community-repository.port';
import { MythEntity } from '../../domain/entities/faq.entity';

@Injectable()
export class GetMythsUseCase implements GetMythsPort {
  constructor(
    @Inject(COMMUNITY_REPOSITORY_PORT)
    private readonly communityRepository: CommunityRepositoryPort,
  ) {}

  async execute(): Promise<MythEntity[]> {
    return this.communityRepository.findMyths();
  }
}
