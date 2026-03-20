export interface SendContactCommand {
  name: string;
  email: string;
  message: string;
}

export interface SendContactPort {
  execute(command: SendContactCommand): Promise<void>;
}

export const SEND_CONTACT_PORT = 'SEND_CONTACT_PORT';
