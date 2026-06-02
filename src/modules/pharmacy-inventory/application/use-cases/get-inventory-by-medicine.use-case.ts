import { Inject, Injectable } from '@nestjs/common';

import { PHARMACY_INVENTORY_REPOSITORY } from '../../domain/repositories/pharmacy-inventory.repository';
import type { PharmacyInventoryRepository } from '../../domain/repositories/pharmacy-inventory.repository';

@Injectable()
export class GetInventoryByMedicineUseCase {
  constructor(
    @Inject(PHARMACY_INVENTORY_REPOSITORY)
    private readonly repository: PharmacyInventoryRepository,
  ) {}

  execute(medicineId: string) {
    return this.repository.findByMedicine(medicineId);
  }
}
