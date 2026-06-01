export class PharmacyReceptionEntity {
  constructor(
    public readonly id: string,
    public readonly pharmacyId: string,
    public readonly dispatchId: string | null,
    public readonly receivedAt: Date,
    public readonly pharmacyName: string | null = null,
    public readonly details: PharmacyReceptionDetailEntity[] = [],
  ) {}
}
export class PharmacyReceptionDetailEntity {
  constructor(
    public readonly id: string,
    public readonly medicineId: string,
    public readonly medicineName: string | null,
    public readonly batchId: string | null,
    public readonly batchNumber: string | null,
    public readonly quantity: number,
  ) {}
}
