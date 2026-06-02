export class PrescriptionEntity {
  constructor(
    public readonly id: string,
    public readonly patientId: string,
    public readonly doctorId: string | null,
    public readonly medicalServiceId: string | null,
    public readonly prescriptionNumber: string | null,
    public readonly issuedAt: Date | null,
    public readonly diagnosis: string | null,
    public readonly observation: string | null,
    public readonly status: string,
    public readonly patientName: string | null = null,
    public readonly doctorName: string | null = null,
    public readonly details: PrescriptionDetailEntity[] = [],
  ) {}
}

export class PrescriptionDetailEntity {
  constructor(
    public readonly id: string,
    public readonly medicineId: string,
    public readonly medicineName: string | null,
    public readonly dosage: string | null,
    public readonly frequency: string | null,
    public readonly duration: string | null,
    public readonly quantity: number,
  ) {}
}
