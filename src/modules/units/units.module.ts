import { Module } from '@nestjs/common';

import { UNITS_REPOSITORY } from './domain/repositories/units.repository';
import { PrismaUnitsRepository } from './infrastructure/repositories/prisma-units.repository';

import { UnitsController } from './infrastructure/controllers/units.controller';

import { GetUnitsUseCase } from './application/use-cases/get-units.use-case';
import { GetUnitByIdUseCase } from './application/use-cases/get-unit-by-id.use-case';
import { CreateUnitUseCase } from './application/use-cases/create-unit.use-case';
import { UpdateUnitUseCase } from './application/use-cases/update-unit.use-case';
import { ToggleUnitUseCase } from './application/use-cases/toggle-unit.use-case';

@Module({
  controllers: [UnitsController],
  providers: [
    GetUnitsUseCase,
    GetUnitByIdUseCase,
    CreateUnitUseCase,
    UpdateUnitUseCase,
    ToggleUnitUseCase,
    {
      provide: UNITS_REPOSITORY,
      useClass: PrismaUnitsRepository,
    },
  ],
})
export class UnitsModule {}
