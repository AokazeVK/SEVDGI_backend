import { Inject, Injectable } from '@nestjs/common';

import { PHARMACY_INVENTORY_REPOSITORY } from '../../domain/repositories/pharmacy-inventory.repository';
import type { PharmacyInventoryRepository } from '../../domain/repositories/pharmacy-inventory.repository';

@Injectable()
export class GetFefoInventoryUseCase {
  constructor(
    @Inject(PHARMACY_INVENTORY_REPOSITORY)
    private readonly repository: PharmacyInventoryRepository,
  ) {}

  execute(pharmacyId: string, medicineId: string) {
    return this.repository.findAvailableByMedicineFefo(pharmacyId, medicineId);
  }
}
