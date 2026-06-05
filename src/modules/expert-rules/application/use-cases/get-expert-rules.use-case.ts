import { Inject, Injectable } from '@nestjs/common';

import { EXPERT_RULES_REPOSITORY } from '../../domain/repositories/expert-rules.repository';
import type { ExpertRulesRepository } from '../../domain/repositories/expert-rules.repository';

@Injectable()
export class GetExpertRulesUseCase {
  constructor(
    @Inject(EXPERT_RULES_REPOSITORY)
    private readonly repository: ExpertRulesRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
