import { Inject, Injectable } from '@nestjs/common';
import { SendContactCommand, SendContactPort } from '../../domain/ports/in/send-contact.port';
import { COMMUNITY_REPOSITORY_PORT, CommunityRepositoryPort } from '../../domain/ports/out/community-repository.port';
import { ContactMessageEntity } from '../../domain/entities/faq.entity';
import { EmailService } from '../../../../shared/email/email.service';

@Injectable()
export class SendContactUseCase implements SendContactPort {
  constructor(
    @Inject(COMMUNITY_REPOSITORY_PORT)
    private readonly communityRepository: CommunityRepositoryPort,
    private readonly emailService: EmailService,
  ) {}

  async execute(command: SendContactCommand): Promise<void> {
    const entity: ContactMessageEntity = {
      id: '',
      name: command.name,
      email: command.email,
      message: command.message,
      createdAt: new Date(),
      userId: command.userId,
    };
    await this.communityRepository.saveContact(entity);
    await this.emailService.sendContactNotification(command);
  }
}
