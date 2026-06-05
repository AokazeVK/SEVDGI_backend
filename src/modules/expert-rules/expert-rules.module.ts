import { Module } from '@nestjs/common';

import { EXPERT_RULES_REPOSITORY } from './domain/repositories/expert-rules.repository';
import { PrismaExpertRulesRepository } from './infrastructure/repositories/prisma-expert-rules.repository';

import { ExpertRulesController } from './infrastructure/controllers/expert-rules.controller';

import { CreateExpertRuleUseCase } from './application/use-cases/create-expert-rule.use-case';
import { GetExpertRuleByIdUseCase } from './application/use-cases/get-expert-rule-by-id.use-case';
import { GetExpertRulesUseCase } from './application/use-cases/get-expert-rules.use-case';
import { ToggleExpertRuleUseCase } from './application/use-cases/toggle-expert-rule.use-case';
import { UpdateExpertRuleUseCase } from './application/use-cases/update-expert-rule.use-case';

@Module({
  controllers: [ExpertRulesController],
  providers: [
    GetExpertRulesUseCase,
    GetExpertRuleByIdUseCase,
    CreateExpertRuleUseCase,
    UpdateExpertRuleUseCase,
    ToggleExpertRuleUseCase,
    {
      provide: EXPERT_RULES_REPOSITORY,
      useClass: PrismaExpertRulesRepository,
    },
  ],
})
export class ExpertRulesModule {}
