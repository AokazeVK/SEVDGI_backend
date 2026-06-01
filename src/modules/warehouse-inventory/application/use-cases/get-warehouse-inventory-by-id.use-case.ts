import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { WAREHOUSE_INVENTORY_REPOSITORY } from '../../domain/repositories/warehouse-inventory.repository';
import type { WarehouseInventoryRepository } from '../../domain/repositories/warehouse-inventory.repository';

@Injectable()
export class GetWarehouseInventoryByIdUseCase {
  constructor(
    @Inject(WAREHOUSE_INVENTORY_REPOSITORY)
    private readonly repository: WarehouseInventoryRepository,
  ) {}

  async execute(id: string) {
    const inventory = await this.repository.findById(id);

    if (!inventory) {
      throw new NotFoundException('Inventario de almacén no encontrado');
    }

    return inventory;
  }
}
