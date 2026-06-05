import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { UpdateExpertRuleDto } from '../dto/update-expert-rule.dto';
import { EXPERT_RULES_REPOSITORY } from '../../domain/repositories/expert-rules.repository';
import type { ExpertRulesRepository } from '../../domain/repositories/expert-rules.repository';

@Injectable()
export class UpdateExpertRuleUseCase {
  constructor(
    @Inject(EXPERT_RULES_REPOSITORY)
    private readonly repository: ExpertRulesRepository,
  ) {}

  async execute(id: string, dto: UpdateExpertRuleDto) {
    const rule = await this.repository.findById(id);

    if (!rule) {
      throw new NotFoundException('Regla experta no encontrada');
    }

    const normalizedCode = dto.code?.trim().toUpperCase();

    if (normalizedCode && normalizedCode !== rule.code) {
      const exists = await this.repository.findByCode(normalizedCode);

      if (exists) {
        throw new BadRequestException('Ya existe una regla con ese código');
      }
    }

    if (dto.conditions && dto.conditions.length === 0) {
      throw new BadRequestException('La regla debe tener al menos una condición');
    }

    if (dto.actions && dto.actions.length === 0) {
      throw new BadRequestException('La regla debe tener al menos una acción');
    }

    return this.repository.update(id, {
      ...dto,
      code: normalizedCode,
    });
  }
}
