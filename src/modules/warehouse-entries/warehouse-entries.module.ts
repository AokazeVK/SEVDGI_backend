import { Module } from '@nestjs/common';

import { WAREHOUSE_ENTRIES_REPOSITORY } from './domain/repositories/warehouse-entries.repository';
import { PrismaWarehouseEntriesRepository } from './infrastructure/repositories/prisma-warehouse-entries.repository';

import { WarehouseEntriesController } from './infrastructure/controllers/warehouse-entries.controller';

import { CreateWarehouseEntryUseCase } from './application/use-cases/create-warehouse-entry.use-case';
import { GetWarehouseEntriesUseCase } from './application/use-cases/get-warehouse-entries.use-case';
import { GetWarehouseEntryByIdUseCase } from './application/use-cases/get-warehouse-entry-by-id.use-case';
import { UpdateWarehouseEntryUseCase } from './application/use-cases/update-warehouse-entry.use-case';

@Module({
  controllers: [WarehouseEntriesController],
  providers: [
    GetWarehouseEntriesUseCase,
    GetWarehouseEntryByIdUseCase,
    CreateWarehouseEntryUseCase,
    UpdateWarehouseEntryUseCase,
    {
      provide: WAREHOUSE_ENTRIES_REPOSITORY,
      useClass: PrismaWarehouseEntriesRepository,
    },
  ],
})
export class WarehouseEntriesModule {}
