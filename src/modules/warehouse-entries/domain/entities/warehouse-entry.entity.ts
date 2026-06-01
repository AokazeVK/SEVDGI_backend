export class WarehouseEntryEntity {
  constructor(
    public readonly id: string,
    public readonly supplierId: string | null,
    public readonly warehouseId: string,
    public readonly entryNumber: string | null,
    public readonly invoiceNumber: string | null,
    public readonly entryDate: Date,
    public readonly status: string,
    public readonly details: WarehouseEntryDetailEntity[] = [],
  ) {}
}

export class WarehouseEntryDetailEntity {
  constructor(
    public readonly id: string,
    public readonly medicineId: string,
    public readonly batchId: string,
    public readonly quantity: number,
    public readonly unitCost: string | null,
  ) {}
}
