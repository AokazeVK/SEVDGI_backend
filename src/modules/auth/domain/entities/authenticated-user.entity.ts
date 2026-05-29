export class AuthenticatedUser {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly email: string,
    public readonly fullName: string,
    public readonly roles: string[],
    public readonly permissions: string[],
  ) {}
}
