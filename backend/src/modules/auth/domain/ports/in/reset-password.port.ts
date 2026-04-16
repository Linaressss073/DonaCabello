export interface ResetPasswordCommand {
  token: string;
  newPassword: string;
}

export interface ResetPasswordPort {
  execute(command: ResetPasswordCommand): Promise<void>;
}

export const RESET_PASSWORD_PORT = 'RESET_PASSWORD_PORT';
