import { Module } from '@nestjs/common';

import { VALIDATION_RESULTS_REPOSITORY } from './domain/repositories/validation-results.repository';
import { PrismaValidationResultsRepository } from './infrastructure/repositories/prisma-validation-results.repository';

import { ValidationResultsController } from './infrastructure/controllers/validation-results.controller';

import { GetValidationResultByIdUseCase } from './application/use-cases/get-validation-result-by-id.use-case';
import { GetValidationResultsByProcessUseCase } from './application/use-cases/get-validation-results-by-process.use-case';
import { GetValidationResultsUseCase } from './application/use-cases/get-validation-results.use-case';

@Module({
  controllers: [ValidationResultsController],
  providers: [
    GetValidationResultsUseCase,
    GetValidationResultByIdUseCase,
    GetValidationResultsByProcessUseCase,
    {
      provide: VALIDATION_RESULTS_REPOSITORY,
      useClass: PrismaValidationResultsRepository,
    },
  ],
})
export class ValidationResultsModule {}
