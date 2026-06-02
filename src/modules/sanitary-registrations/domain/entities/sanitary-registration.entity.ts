export class SanitaryRegistrationEntity {
  constructor(
    public readonly id: string,
    public readonly medicineId: string,
    public readonly laboratoryId: string,

    public readonly registrationNumber: string,

    public readonly issuedAt: Date | null,
    public readonly expiresAt: Date | null,

    public readonly isActive: boolean,

    public readonly medicineName: string | null = null,
    public readonly laboratoryName: string | null = null,
  ) {}
}
