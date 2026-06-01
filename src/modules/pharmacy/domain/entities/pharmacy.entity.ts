export class PharmacyEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly location: string | null,
    public readonly isActive: boolean,
  ) {}
}
