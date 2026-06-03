import { Inject, Injectable } from '@nestjs/common';

import { KARDEX_REPOSITORY } from '../../domain/repositories/kardex.repository';
import type { KardexRepository } from '../../domain/repositories/kardex.repository';

@Injectable()
export class GetKardexByMedicineUseCase {
  constructor(
    @Inject(KARDEX_REPOSITORY)
    private readonly repository: KardexRepository,
  ) {}

  execute(medicineId: string) {
    return this.repository.findByMedicine(medicineId);
  }
}
