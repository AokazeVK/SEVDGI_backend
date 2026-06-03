import { Module } from '@nestjs/common';

import { STOCK_MOVEMENTS_REPOSITORY } from './domain/repositories/stock-movements.repository';
import { PrismaStockMovementsRepository } from './infrastructure/repositories/prisma-stock-movements.repository';

import { StockMovementsController } from './infrastructure/controllers/stock-movements.controller';

import { GetStockMovementByIdUseCase } from './application/use-cases/get-stock-movement-by-id.use-case';
import { GetStockMovementsByBatchUseCase } from './application/use-cases/get-stock-movements-by-batch.use-case';
import { GetStockMovementsByMedicineUseCase } from './application/use-cases/get-stock-movements-by-medicine.use-case';
import { GetStockMovementsByPharmacyUseCase } from './application/use-cases/get-stock-movements-by-pharmacy.use-case';
import { GetStockMovementsByWarehouseUseCase } from './application/use-cases/get-stock-movements-by-warehouse.use-case';
import { GetStockMovementsUseCase } from './application/use-cases/get-stock-movements.use-case';

@Module({
  controllers: [StockMovementsController],
  providers: [
    GetStockMovementsUseCase,
    GetStockMovementByIdUseCase,
    GetStockMovementsByMedicineUseCase,
    GetStockMovementsByBatchUseCase,
    GetStockMovementsByWarehouseUseCase,
    GetStockMovementsByPharmacyUseCase,
    {
      provide: STOCK_MOVEMENTS_REPOSITORY,
      useClass: PrismaStockMovementsRepository,
    },
  ],
})
export class StockMovementsModule {}
