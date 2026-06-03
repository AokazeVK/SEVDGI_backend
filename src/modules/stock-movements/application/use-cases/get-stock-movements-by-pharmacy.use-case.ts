import { Inject, Injectable } from '@nestjs/common';

import { STOCK_MOVEMENTS_REPOSITORY } from '../../domain/repositories/stock-movements.repository';
import type { StockMovementsRepository } from '../../domain/repositories/stock-movements.repository';

@Injectable()
export class GetStockMovementsByPharmacyUseCase {
  constructor(
    @Inject(STOCK_MOVEMENTS_REPOSITORY)
    private readonly repository: StockMovementsRepository,
  ) {}

  execute(pharmacyId: string) {
    return this.repository.findByPharmacy(pharmacyId);
  }
}
