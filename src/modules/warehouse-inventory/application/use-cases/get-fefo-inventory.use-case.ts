import { Inject, Injectable } from '@nestjs/common';

import { WAREHOUSE_INVENTORY_REPOSITORY } from '../../domain/repositories/warehouse-inventory.repository';
import type { WarehouseInventoryRepository } from '../../domain/repositories/warehouse-inventory.repository';

@Injectable()
export class GetFefoInventoryUseCase {
  constructor(
    @Inject(WAREHOUSE_INVENTORY_REPOSITORY)
    private readonly repository: WarehouseInventoryRepository,
  ) {}

  execute(warehouseId: string, medicineId: string) {
    return this.repository.findAvailableByMedicineFefo(warehouseId, medicineId);
  }
}
