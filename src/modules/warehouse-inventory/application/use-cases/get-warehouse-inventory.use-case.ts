import { Inject, Injectable } from '@nestjs/common';

import { WAREHOUSE_INVENTORY_REPOSITORY } from '../../domain/repositories/warehouse-inventory.repository';
import type { WarehouseInventoryRepository } from '../../domain/repositories/warehouse-inventory.repository';

@Injectable()
export class GetWarehouseInventoryUseCase {
  constructor(
    @Inject(WAREHOUSE_INVENTORY_REPOSITORY)
    private readonly repository: WarehouseInventoryRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
