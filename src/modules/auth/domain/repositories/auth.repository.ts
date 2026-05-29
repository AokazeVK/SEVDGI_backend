export const AUTH_REPOSITORY = Symbol('AUTH_REPOSITORY');

export interface AuthUserRecord {
  id: string;
  username: string;
  email: string;
  fullName: string;
  passwordHash: string;
  roles: string[];
  permissions: string[];
}

export interface AuthRepository {
  findActiveUserByUsernameOrEmail(
    usernameOrEmail: string,
  ): Promise<AuthUserRecord | null>;
}
