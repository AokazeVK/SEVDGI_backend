import { Inject, Injectable } from '@nestjs/common';

import { STOCK_MOVEMENTS_REPOSITORY } from '../../domain/repositories/stock-movements.repository';
import type { StockMovementsRepository } from '../../domain/repositories/stock-movements.repository';

@Injectable()
export class GetStockMovementsByWarehouseUseCase {
  constructor(
    @Inject(STOCK_MOVEMENTS_REPOSITORY)
    private readonly repository: StockMovementsRepository,
  ) {}

  execute(warehouseId: string) {
    return this.repository.findByWarehouse(warehouseId);
  }
}
