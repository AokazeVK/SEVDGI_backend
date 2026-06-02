import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { PRESCRIPTIONS_REPOSITORY } from '../../domain/repositories/prescriptions.repository';
import type { PrescriptionsRepository } from '../../domain/repositories/prescriptions.repository';

@Injectable()
export class CancelPrescriptionUseCase {
  constructor(
    @Inject(PRESCRIPTIONS_REPOSITORY)
    private readonly repository: PrescriptionsRepository,
  ) {}

  async execute(id: string) {
    const prescription = await this.repository.findById(id);

    if (!prescription) {
      throw new NotFoundException('Receta no encontrada');
    }

    if (prescription.status === 'DISPENSED') {
      throw new BadRequestException('No se puede cancelar una receta ya dispensada');
    }

    if (prescription.status === 'CANCELLED') {
      throw new BadRequestException('La receta ya está cancelada');
    }

    return this.repository.cancel(id);
  }
}
