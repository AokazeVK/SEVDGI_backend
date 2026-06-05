import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { EXPERT_RULES_REPOSITORY } from '../../domain/repositories/expert-rules.repository';
import type { ExpertRulesRepository } from '../../domain/repositories/expert-rules.repository';

@Injectable()
export class ToggleExpertRuleUseCase {
  constructor(
    @Inject(EXPERT_RULES_REPOSITORY)
    private readonly repository: ExpertRulesRepository,
  ) {}

  async execute(id: string) {
    const rule = await this.repository.findById(id);

    if (!rule) {
      throw new NotFoundException('Regla experta no encontrada');
    }

    return this.repository.toggle(id);
  }
}
