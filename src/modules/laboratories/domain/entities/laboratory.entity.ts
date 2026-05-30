export class LaboratoryEntity {
  constructor(
    public readonly id: string,
    public readonly nit: string | null,
    public readonly name: string,
    public readonly country: string | null,
    public readonly isActive: boolean,
  ) {}
}