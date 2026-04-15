import { Inject, Injectable } from '@nestjs/common';
import { RegisterCenterCommand, RegisterCenterPort } from '../../domain/ports/in/register-center.port';
import { CENTERS_REPOSITORY_PORT, CentersRepositoryPort } from '../../domain/ports/out/centers-repository.port';
import { CenterEntity } from '../../domain/entities/center.entity';

@Injectable()
export class RegisterCenterUseCase implements RegisterCenterPort {
  constructor(
    @Inject(CENTERS_REPOSITORY_PORT)
    private readonly centersRepository: CentersRepositoryPort,
  ) {}

  async execute(command: RegisterCenterCommand): Promise<CenterEntity> {
    const center = new CenterEntity();
    center.name = command.name;
    center.address = command.address;
    center.city = command.city;
    center.phone = command.phone;
    center.email = command.email;
    center.description = command.description;
    center.ownerId = command.ownerId;
    center.status = 'verified';
    center.latitude = command.latitude;
    center.longitude = command.longitude;
    return this.centersRepository.save(center);
  }
}
