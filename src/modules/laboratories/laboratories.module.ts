import { Module } from '@nestjs/common';

import { LABORATORIES_REPOSITORY } from './domain/repositories/laboratories.repository';
import { PrismaLaboratoriesRepository } from './infrastructure/repositories/prisma-laboratories.repository';

import { LaboratoriesController } from './infrastructure/controllers/laboratories.controller';

import { GetLaboratoriesUseCase } from './application/use-cases/get-laboratories.use-case';
import { GetLaboratoryByIdUseCase } from './application/use-cases/get-laboratory-by-id.use-case';
import { CreateLaboratoryUseCase } from './application/use-cases/create-laboratory.use-case';
import { UpdateLaboratoryUseCase } from './application/use-cases/update-laboratory.use-case';
import { ToggleLaboratoryUseCase } from './application/use-cases/toggle-laboratory.use-case';

@Module({
  controllers: [LaboratoriesController],
  providers: [
    GetLaboratoriesUseCase,
    GetLaboratoryByIdUseCase,
    CreateLaboratoryUseCase,
    UpdateLaboratoryUseCase,
    ToggleLaboratoryUseCase,
    {
      provide: LABORATORIES_REPOSITORY,
      useClass: PrismaLaboratoriesRepository,
    },
  ],
})
export class LaboratoriesModule {}