import { Inject, Injectable } from '@nestjs/common';

import { STOCK_MOVEMENTS_REPOSITORY } from '../../domain/repositories/stock-movements.repository';
import type { StockMovementsRepository } from '../../domain/repositories/stock-movements.repository';

@Injectable()
export class GetStockMovementsUseCase {
  constructor(
    @Inject(STOCK_MOVEMENTS_REPOSITORY)
    private readonly repository: StockMovementsRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
