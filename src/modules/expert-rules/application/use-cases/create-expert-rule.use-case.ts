import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { CreateExpertRuleDto } from '../dto/create-expert-rule.dto';
import { EXPERT_RULES_REPOSITORY } from '../../domain/repositories/expert-rules.repository';
import type { ExpertRulesRepository } from '../../domain/repositories/expert-rules.repository';

@Injectable()
export class CreateExpertRuleUseCase {
  constructor(
    @Inject(EXPERT_RULES_REPOSITORY)
    private readonly repository: ExpertRulesRepository,
  ) {}

  async execute(dto: CreateExpertRuleDto) {
    if (!dto.conditions || dto.conditions.length === 0) {
      throw new BadRequestException('La regla debe tener al menos una condición');
    }

    if (!dto.actions || dto.actions.length === 0) {
      throw new BadRequestException('La regla debe tener al menos una acción');
    }

    const normalizedCode = dto.code.trim().toUpperCase();

    const exists = await this.repository.findByCode(normalizedCode);

    if (exists) {
      throw new BadRequestException('Ya existe una regla con ese código');
    }

    return this.repository.create({
      ...dto,
      code: normalizedCode,
      module: dto.module ?? 'DOCUMENTS',
    });
  }
}
