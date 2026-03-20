import { Inject, Injectable } from '@nestjs/common';
import { GetFaqsPort } from '../../domain/ports/in/get-faqs.port';
import { COMMUNITY_REPOSITORY_PORT, CommunityRepositoryPort } from '../../domain/ports/out/community-repository.port';
import { FaqEntity } from '../../domain/entities/faq.entity';

@Injectable()
export class GetFaqsUseCase implements GetFaqsPort {
  constructor(
    @Inject(COMMUNITY_REPOSITORY_PORT)
    private readonly communityRepository: CommunityRepositoryPort,
  ) {}

  async execute(): Promise<FaqEntity[]> {
    throw new Error('Not implemented');
  }
}
