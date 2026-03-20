import { Inject, Injectable } from '@nestjs/common';
import { SendContactCommand, SendContactPort } from '../../domain/ports/in/send-contact.port';
import { COMMUNITY_REPOSITORY_PORT, CommunityRepositoryPort } from '../../domain/ports/out/community-repository.port';

@Injectable()
export class SendContactUseCase implements SendContactPort {
  constructor(
    @Inject(COMMUNITY_REPOSITORY_PORT)
    private readonly communityRepository: CommunityRepositoryPort,
  ) {}

  async execute(command: SendContactCommand): Promise<void> {
    throw new Error('Not implemented');
  }
}
