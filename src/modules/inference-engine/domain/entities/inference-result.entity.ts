export class InferenceResultEntity {
  constructor(
    public readonly processId: string,
    public readonly status: string,
    public readonly summary: string,
    public readonly details: InferenceDetailEntity[],
  ) {}
}

export class InferenceDetailEntity {
  constructor(
    public readonly ruleId: string,
    public readonly ruleCode: string,
    public readonly ruleName: string,
    public readonly status: string,
    public readonly message: string,
  ) {}
}
