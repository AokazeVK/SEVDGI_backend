import { Module } from '@nestjs/common';

import { VALIDATION_PROCESSES_REPOSITORY } from './domain/repositories/validation-processes.repository';
import { PrismaValidationProcessesRepository } from './infrastructure/repositories/prisma-validation-processes.repository';

import { ValidationProcessesController } from './infrastructure/controllers/validation-processes.controller';

import { CreateValidationProcessUseCase } from './application/use-cases/create-validation-process.use-case';
import { GetValidationProcessByIdUseCase } from './application/use-cases/get-validation-process-by-id.use-case';
import { GetValidationProcessesByDocumentUseCase } from './application/use-cases/get-validation-processes-by-document.use-case';
import { GetValidationProcessesByWarehouseEntryUseCase } from './application/use-cases/get-validation-processes-by-warehouse-entry.use-case';
import { GetValidationProcessesUseCase } from './application/use-cases/get-validation-processes.use-case';
import { UpdateValidationProcessStatusUseCase } from './application/use-cases/update-validation-process-status.use-case';

@Module({
  controllers: [ValidationProcessesController],
  providers: [
    GetValidationProcessesUseCase,
    GetValidationProcessByIdUseCase,
    GetValidationProcessesByDocumentUseCase,
    GetValidationProcessesByWarehouseEntryUseCase,
    CreateValidationProcessUseCase,
    UpdateValidationProcessStatusUseCase,
    {
      provide: VALIDATION_PROCESSES_REPOSITORY,
      useClass: PrismaValidationProcessesRepository,
    },
  ],
})
export class ValidationProcessesModule {}
