export const PASSWORD_HASHER = Symbol('PASSWORD_HASHER');

export interface PasswordHasher {
  compare(plainPassword: string, hashedPassword: string): Promise<boolean>;
}
