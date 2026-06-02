import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { PRESCRIPTIONS_REPOSITORY } from '../../domain/repositories/prescriptions.repository';
import type { PrescriptionsRepository } from '../../domain/repositories/prescriptions.repository';

@Injectable()
export class GetPrescriptionByIdUseCase {
  constructor(
    @Inject(PRESCRIPTIONS_REPOSITORY)
    private readonly repository: PrescriptionsRepository,
  ) {}

  async execute(id: string) {
    const prescription = await this.repository.findById(id);

    if (!prescription) {
      throw new NotFoundException('Receta no encontrada');
    }

    return prescription;
  }
}
