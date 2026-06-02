export class PharmacyDispensationEntity {
  constructor(
    public readonly id: string,
    public readonly pharmacyId: string,
    public readonly patientId: string,
    public readonly prescriptionId: string,
    public readonly dispensedAt: Date,
    public readonly pharmacyName: string | null = null,
    public readonly patientName: string | null = null,
    public readonly prescriptionNumber: string | null = null,
    public readonly details: PharmacyDispensationDetailEntity[] = [],
  ) {}
}

export class PharmacyDispensationDetailEntity {
  constructor(
    public readonly id: string,
    public readonly medicineId: string,
    public readonly medicineName: string | null,
    public readonly batchId: string | null,
    public readonly batchNumber: string | null,
    public readonly quantity: number,
  ) {}
}
