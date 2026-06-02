import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { PHARMACY_INVENTORY_REPOSITORY } from '../../domain/repositories/pharmacy-inventory.repository';
import type { PharmacyInventoryRepository } from '../../domain/repositories/pharmacy-inventory.repository';

@Injectable()
export class GetPharmacyInventoryByIdUseCase {
  constructor(
    @Inject(PHARMACY_INVENTORY_REPOSITORY)
    private readonly repository: PharmacyInventoryRepository,
  ) {}

  async execute(id: string) {
    const inventory = await this.repository.findById(id);

    if (!inventory) {
      throw new NotFoundException('Inventario de farmacia no encontrado');
    }

    return inventory;
  }
}
