export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly email: string,
    public readonly fullName: string,
    public readonly isActive: boolean,
    public readonly roles: string[] = [],
  ) {}
}
