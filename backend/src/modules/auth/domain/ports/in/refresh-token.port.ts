export interface RefreshTokenCommand {
  refreshToken: string;
}

export interface RefreshTokenResult {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenPort {
  execute(command: RefreshTokenCommand): Promise<RefreshTokenResult>;
}

export const REFRESH_TOKEN_PORT = 'REFRESH_TOKEN_PORT';