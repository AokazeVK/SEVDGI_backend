export class StockMovementEntity {
  constructor(
    public readonly id: string,
    public readonly medicineId: string,
    public readonly batchId: string | null,
    public readonly type: string,
    public readonly quantity: number,
    public readonly warehouseId: string | null,
    public readonly pharmacyId: string | null,
    public readonly referenceId: string | null,
    public readonly observation: string | null,
    public readonly createdAt: Date,
  ) {}
}
