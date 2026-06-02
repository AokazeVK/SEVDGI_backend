export class PatientEntity {
  constructor(
    public readonly id: string,
    public readonly ci: string | null,
    public readonly fullName: string,
    public readonly birthDate: Date | null,
    public readonly phone: string | null,
    public readonly address: string | null,
    public readonly isActive: boolean,
  ) {}
}
