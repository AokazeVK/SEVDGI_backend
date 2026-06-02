export class DoctorEntity {
  constructor(
    public readonly id: string,
    public readonly fullName: string,
    public readonly licenseNumber: string | null,
    public readonly specialty: string | null,
    public readonly isActive: boolean,
  ) {}
}
