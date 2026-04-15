export interface LoginCommand {
  email: string;
  password: string;
}

export interface LoginResult {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface LoginPort {
  execute(command: LoginCommand): Promise<LoginResult>;
}

export const LOGIN_PORT = 'LOGIN_PORT';
