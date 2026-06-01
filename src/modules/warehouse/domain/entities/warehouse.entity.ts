export class WarehouseEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string | null,
    public readonly location: string | null,
    public readonly isActive: boolean,
  ) {}
}
