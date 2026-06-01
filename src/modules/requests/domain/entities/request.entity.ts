export class RequestEntity {
  constructor(
    public readonly id: string,
    public readonly pharmacyId: string,
    public readonly status: string,
    public readonly requestedAt: Date,
    public readonly observation: string | null,
    public readonly pharmacyName: string | null = null,
    public readonly details: RequestDetailEntity[] = [],
  ) {}
}

export class RequestDetailEntity {
  constructor(
    public readonly id: string,
    public readonly medicineId: string,
    public readonly medicineName: string | null,
    public readonly quantity: number,
  ) {}
}
