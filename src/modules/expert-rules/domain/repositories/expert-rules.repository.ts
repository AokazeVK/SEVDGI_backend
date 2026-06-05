import { ExpertRuleEntity } from '../entities/expert-rule.entity';

export const EXPERT_RULES_REPOSITORY = Symbol('EXPERT_RULES_REPOSITORY');

export interface CreateExpertRuleData {
  code: string;
  name: string;
  description?: string;
  module?: string;
  priority?: number;
  conditions: {
    leftField: string;
    operator: string;
    rightField?: string;
    expectedValue?: string;
  }[];
  actions: {
    actionType: string;
    severity?: string;
    message?: string;
  }[];
}

export interface UpdateExpertRuleData {
  code?: string;
  name?: string;
  description?: string;
  module?: string;
  priority?: number;
  conditions?: {
    leftField: string;
    operator: string;
    rightField?: string;
    expectedValue?: string;
  }[];
  actions?: {
    actionType: string;
    severity?: string;
    message?: string;
  }[];
}

export interface ExpertRulesRepository {
  findAll(): Promise<ExpertRuleEntity[]>;
  findById(id: string): Promise<ExpertRuleEntity | null>;
  findByCode(code: string): Promise<ExpertRuleEntity | null>;
  create(data: CreateExpertRuleData): Promise<ExpertRuleEntity>;
  update(id: string, data: UpdateExpertRuleData): Promise<ExpertRuleEntity>;
  toggle(id: string): Promise<ExpertRuleEntity>;
}
