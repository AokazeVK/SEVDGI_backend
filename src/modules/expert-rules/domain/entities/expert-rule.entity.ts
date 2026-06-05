export class ExpertRuleEntity {
  constructor(
    public readonly id: string,
    public readonly code: string,
    public readonly name: string,
    public readonly description: string | null,
    public readonly module: string,
    public readonly isActive: boolean,
    public readonly priority: number,
    public readonly conditions: ExpertRuleConditionEntity[] = [],
    public readonly actions: ExpertRuleActionEntity[] = [],
  ) {}
}

export class ExpertRuleConditionEntity {
  constructor(
    public readonly id: string,
    public readonly leftField: string,
    public readonly operator: string,
    public readonly rightField: string | null,
    public readonly expectedValue: string | null,
  ) {}
}

export class ExpertRuleActionEntity {
  constructor(
    public readonly id: string,
    public readonly actionType: string,
    public readonly severity: string,
    public readonly message: string | null,
  ) {}
}
