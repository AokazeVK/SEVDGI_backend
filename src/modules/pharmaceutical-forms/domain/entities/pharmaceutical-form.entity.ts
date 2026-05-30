export class PharmaceuticalFormEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly isActive: boolean,
  ) {}
}
