import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MEDICINES_REPOSITORY } from '../../domain/repositories/medicines.repository';
import type { MedicinesRepository } from '../../domain/repositories/medicines.repository';

@Injectable()
export class GetMedicineByIdUseCase {
  constructor(
    @Inject(MEDICINES_REPOSITORY)
    private readonly repository: MedicinesRepository,
  ) {}

  async execute(id: string) {
    const medicine = await this.repository.findById(id);

    if (!medicine) {
      throw new NotFoundException('Medicamento no encontrado');
    }

    return medicine;
  }
}
