export const TOKEN_SERVICE = Symbol('TOKEN_SERVICE');

export interface TokenPayload {
  sub: string;
  username: string;
  roles: string[];
  permissions: string[];
}

export interface TokenService {
  generateAccessToken(payload: TokenPayload): Promise<string>;
}
