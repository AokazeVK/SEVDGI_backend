export class PharmacyInventoryEntity {
  constructor(
    public readonly id: string,
    public readonly pharmacyId: string,
    public readonly medicineId: string,
    public readonly batchId: string | null,

    public readonly stock: number,
    public readonly minimumStock: number,

    public readonly pharmacyName: string | null,
    public readonly medicineName: string | null,
    public readonly batchNumber: string | null,
    public readonly expirationDate: Date | null,
  ) {}
}
