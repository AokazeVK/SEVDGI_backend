import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { PHARMACY_RECEPTIONS_REPOSITORY } from '../../domain/repositories/pharmacy-receptions.repository';
import type { PharmacyReceptionsRepository } from '../../domain/repositories/pharmacy-receptions.repository';

@Injectable()
export class GetPharmacyReceptionByIdUseCase {
  constructor(
    @Inject(PHARMACY_RECEPTIONS_REPOSITORY)
    private readonly repository: PharmacyReceptionsRepository,
  ) {}

  async execute(id: string) {
    const reception = await this.repository.findById(id);

    if (!reception) {
      throw new NotFoundException('Recepción de farmacia no encontrada');
    }

    return reception;
  }
}
