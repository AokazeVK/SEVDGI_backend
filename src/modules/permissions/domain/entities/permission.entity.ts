export class PermissionEntity {
  constructor(
    public readonly id: string,
    public readonly code: string,
    public readonly name: string,
    public readonly module: string | null,
    public readonly description: string | null,
    public readonly isActive: boolean,
  ) {}
}
