import { Inject, Injectable } from '@nestjs/common';

import { KARDEX_REPOSITORY } from '../../domain/repositories/kardex.repository';
import type { KardexRepository } from '../../domain/repositories/kardex.repository';

@Injectable()
export class GetKardexByWarehouseUseCase {
  constructor(
    @Inject(KARDEX_REPOSITORY)
    private readonly repository: KardexRepository,
  ) {}

  execute(warehouseId: string) {
    return this.repository.findByWarehouse(warehouseId);
  }
}
