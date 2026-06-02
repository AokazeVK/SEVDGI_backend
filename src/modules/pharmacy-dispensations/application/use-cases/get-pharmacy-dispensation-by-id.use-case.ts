import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { PHARMACY_DISPENSATIONS_REPOSITORY } from '../../domain/repositories/pharmacy-dispensations.repository';
import type { PharmacyDispensationsRepository } from '../../domain/repositories/pharmacy-dispensations.repository';

@Injectable()
export class GetPharmacyDispensationByIdUseCase {
  constructor(
    @Inject(PHARMACY_DISPENSATIONS_REPOSITORY)
    private readonly repository: PharmacyDispensationsRepository,
  ) {}

  async execute(id: string) {
    const dispensation = await this.repository.findById(id);

    if (!dispensation) {
      throw new NotFoundException('Dispensación no encontrada');
    }

    return dispensation;
  }
}
