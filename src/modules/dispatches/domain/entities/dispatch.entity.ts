export class DispatchEntity {
  constructor(
    public readonly id: string,
    public readonly requestId: string | null,
    public readonly warehouseId: string,
    public readonly status: string,
    public readonly dispatchedAt: Date | null,
    public readonly warehouseName: string | null = null,
    public readonly details: DispatchDetailEntity[] = [],
  ) {}
}

export class DispatchDetailEntity {
  constructor(
    public readonly id: string,
    public readonly medicineId: string,
    public readonly medicineName: string | null,
    public readonly batchId: string | null,
    public readonly batchNumber: string | null,
    public readonly quantity: number,
  ) {}
}
