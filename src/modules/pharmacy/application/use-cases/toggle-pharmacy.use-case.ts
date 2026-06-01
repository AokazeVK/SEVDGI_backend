import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { PHARMACY_REPOSITORY } from '../../domain/repositories/pharmacy.repository';
import type { PharmacyRepository } from '../../domain/repositories/pharmacy.repository';

@Injectable()
export class TogglePharmacyUseCase {
  constructor(
    @Inject(PHARMACY_REPOSITORY)
    private readonly repository: PharmacyRepository,
  ) {}

  async execute(id: string) {
    const pharmacy = await this.repository.findById(id);

    if (!pharmacy) {
      throw new NotFoundException('Farmacia no encontrada');
    }

    return this.repository.toggle(id);
  }
}
