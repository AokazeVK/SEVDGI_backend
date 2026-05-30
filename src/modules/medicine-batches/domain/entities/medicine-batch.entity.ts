export class MedicineBatchEntity {
  constructor(
    public readonly id: string,
    public readonly medicineId: string,
    public readonly batchNumber: string,
    public readonly expirationDate: Date,
    public readonly isActive: boolean,
  ) {}
}
