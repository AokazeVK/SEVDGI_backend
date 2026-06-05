export class ValidationProcessEntity {
  constructor(
    public readonly id: string,
    public readonly documentId: string | null,
    public readonly warehouseEntryId: string | null,
    public readonly status: string,
    public readonly createdAt: Date,
    public readonly results: ValidationResultEntity[] = [],
  ) {}
}

export class ValidationResultEntity {
  constructor(
    public readonly id: string,
    public readonly processId: string,
    public readonly status: string,
    public readonly summary: string | null,
    public readonly createdAt: Date,
    public readonly details: ValidationResultDetailEntity[] = [],
  ) {}
}

export class ValidationResultDetailEntity {
  constructor(
    public readonly id: string,
    public readonly validationResultId: string,
    public readonly ruleId: string | null,
    public readonly status: string,
    public readonly message: string | null,
    public readonly ruleCode: string | null = null,
    public readonly ruleName: string | null = null,
  ) {}
}
