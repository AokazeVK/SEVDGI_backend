export class WarehouseInventoryEntity {
  constructor(
    public readonly id: string,
    public readonly warehouseId: string,
    public readonly medicineId: string,
    public readonly batchId: string,

    public readonly stock: number,
    public readonly minimumStock: number,

    public readonly warehouseName: string | null,
    public readonly medicineName: string | null,
    public readonly batchNumber: string | null,
    public readonly expirationDate: Date | null,
  ) {}
}
