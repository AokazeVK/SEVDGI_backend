import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMedicineDto } from '../dto/update-medicine.dto';
import { MEDICINES_REPOSITORY } from '../../domain/repositories/medicines.repository';
import type { MedicinesRepository } from '../../domain/repositories/medicines.repository';

@Injectable()
export class UpdateMedicineUseCase {
  constructor(
    @Inject(MEDICINES_REPOSITORY)
    private readonly repository: MedicinesRepository,
  ) {}

  async execute(id: string, dto: UpdateMedicineDto) {
    const medicine = await this.repository.findById(id);

    if (!medicine) {
      throw new NotFoundException('Medicamento no encontrado');
    }

    if (dto.code && dto.code !== medicine.code) {
      const codeExists = await this.repository.findByCode(dto.code);

      if (codeExists) {
        throw new BadRequestException('El código del medicamento ya existe');
      }
    }

    return this.repository.update(id, dto);
  }
}
