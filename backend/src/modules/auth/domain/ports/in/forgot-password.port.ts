export interface ForgotPasswordCommand {
  email: string;
}

export interface ForgotPasswordPort {
  execute(command: ForgotPasswordCommand): Promise<void>;
}

export const FORGOT_PASSWORD_PORT = 'FORGOT_PASSWORD_PORT';
