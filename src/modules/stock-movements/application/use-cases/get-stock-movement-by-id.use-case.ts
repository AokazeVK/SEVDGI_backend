import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { STOCK_MOVEMENTS_REPOSITORY } from '../../domain/repositories/stock-movements.repository';
import type { StockMovementsRepository } from '../../domain/repositories/stock-movements.repository';

@Injectable()
export class GetStockMovementByIdUseCase {
  constructor(
    @Inject(STOCK_MOVEMENTS_REPOSITORY)
    private readonly repository: StockMovementsRepository,
  ) {}

  async execute(id: string) {
    const item = await this.repository.findById(id);

    if (!item) {
      throw new NotFoundException('Movimiento de stock no encontrado');
    }

    return item;
  }
}
