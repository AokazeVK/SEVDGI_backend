import { Inject, Injectable } from '@nestjs/common';

import { STOCK_MOVEMENTS_REPOSITORY } from '../../domain/repositories/stock-movements.repository';
import type { StockMovementsRepository } from '../../domain/repositories/stock-movements.repository';

@Injectable()
export class GetStockMovementsByBatchUseCase {
  constructor(
    @Inject(STOCK_MOVEMENTS_REPOSITORY)
    private readonly repository: StockMovementsRepository,
  ) {}

  execute(batchId: string) {
    return this.repository.findByBatch(batchId);
  }
}
