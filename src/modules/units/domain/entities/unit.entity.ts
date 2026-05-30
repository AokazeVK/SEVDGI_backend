export class UnitEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly symbol: string | null,
    public readonly isActive: boolean,
  ) {}
}
