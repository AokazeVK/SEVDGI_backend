import { Module } from '@nestjs/common';

import { InferenceEngineService } from './application/services/inference-engine.service';
import { ConditionEvaluatorService } from './application/services/condition-evaluator.service';
import { ProcessValidationUseCase } from './application/use-cases/process-validation.use-case';

import { InferenceEngineController } from './infrastructure/controllers/inference-engine.controller';

@Module({
  controllers: [InferenceEngineController],
  providers: [ConditionEvaluatorService, InferenceEngineService, ProcessValidationUseCase],
})
export class InferenceEngineModule {}
