export class KardexEntity {
  constructor(
    public readonly id: string,
    public readonly medicineId: string,
    public readonly batchId: string | null,
    public readonly movementType: string,
    public readonly quantityIn: number,
    public readonly quantityOut: number,
    public readonly balance: number,
    public readonly warehouseId: string | null,
    public readonly pharmacyId: string | null,
    public readonly referenceId: string | null,
    public readonly createdAt: Date,
  ) {}
}
