import { Module } from '@nestjs/common';

import { WAREHOUSE_REPOSITORY } from './domain/repositories/warehouse.repository';
import { PrismaWarehouseRepository } from './infrastructure/repositories/prisma-warehouse.repository';

import { WarehouseController } from './infrastructure/controllers/warehouse.controller';

import { CreateWarehouseUseCase } from './application/use-cases/create-warehouse.use-case';
import { GetWarehouseByIdUseCase } from './application/use-cases/get-warehouse-by-id.use-case';
import { GetWarehouseUseCase } from './application/use-cases/get-warehouse.use-case';
import { ToggleWarehouseUseCase } from './application/use-cases/toggle-warehouse.use-case';
import { UpdateWarehouseUseCase } from './application/use-cases/update-warehouse.use-case';

@Module({
  controllers: [WarehouseController],
  providers: [
    GetWarehouseUseCase,
    GetWarehouseByIdUseCase,
    CreateWarehouseUseCase,
    UpdateWarehouseUseCase,
    ToggleWarehouseUseCase,
    {
      provide: WAREHOUSE_REPOSITORY,
      useClass: PrismaWarehouseRepository,
    },
  ],
})
export class WarehouseModule {}
