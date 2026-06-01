import { Module } from '@nestjs/common';

import { WAREHOUSE_INVENTORY_REPOSITORY } from './domain/repositories/warehouse-inventory.repository';
import { PrismaWarehouseInventoryRepository } from './infrastructure/repositories/prisma-warehouse-inventory.repository';

import { WarehouseInventoryController } from './infrastructure/controllers/warehouse-inventory.controller';

import { GetWarehouseInventoryUseCase } from './application/use-cases/get-warehouse-inventory.use-case';
import { GetWarehouseInventoryByIdUseCase } from './application/use-cases/get-warehouse-inventory-by-id.use-case';
import { GetInventoryByWarehouseUseCase } from './application/use-cases/get-inventory-by-warehouse.use-case';
import { GetInventoryByMedicineUseCase } from './application/use-cases/get-inventory-by-medicine.use-case';
import { GetFefoInventoryUseCase } from './application/use-cases/get-fefo-inventory.use-case';

@Module({
  controllers: [WarehouseInventoryController],
  providers: [
    GetWarehouseInventoryUseCase,
    GetWarehouseInventoryByIdUseCase,
    GetInventoryByWarehouseUseCase,
    GetInventoryByMedicineUseCase,
    GetFefoInventoryUseCase,
    {
      provide: WAREHOUSE_INVENTORY_REPOSITORY,
      useClass: PrismaWarehouseInventoryRepository,
    },
  ],
})
export class WarehouseInventoryModule {}
