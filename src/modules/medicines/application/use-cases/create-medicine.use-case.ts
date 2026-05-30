import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateMedicineDto } from '../dto/create-medicine.dto';
import { MEDICINES_REPOSITORY } from '../../domain/repositories/medicines.repository';
import type { MedicinesRepository } from '../../domain/repositories/medicines.repository';

@Injectable()
export class CreateMedicineUseCase {
  constructor(
    @Inject(MEDICINES_REPOSITORY)
    private readonly repository: MedicinesRepository,
  ) {}

  async execute(dto: CreateMedicineDto) {
    if (dto.code) {
      const codeExists = await this.repository.findByCode(dto.code);

      if (codeExists) {
        throw new BadRequestException('El código del medicamento ya existe');
      }
    }

    return this.repository.create(dto);
  }
}
