import { CenterEntity, CenterStatus } from '../../entities/center.entity';

export interface UpdateCenterStatusCommand {
  id: string;
  status: CenterStatus;
}

export interface UpdateCenterStatusPort {
  execute(command: UpdateCenterStatusCommand): Promise<CenterEntity>;
}

export const UPDATE_CENTER_STATUS_PORT = 'UPDATE_CENTER_STATUS_PORT';
