export class ManufacturerEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly country: string | null,
    public readonly isActive: boolean,
  ) {}
}