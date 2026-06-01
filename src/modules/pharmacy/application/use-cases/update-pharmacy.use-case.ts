import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { UpdatePharmacyDto } from '../dto/update-pharmacy.dto';
import { PHARMACY_REPOSITORY } from '../../domain/repositories/pharmacy.repository';
import type { PharmacyRepository } from '../../domain/repositories/pharmacy.repository';

@Injectable()
export class UpdatePharmacyUseCase {
  constructor(
    @Inject(PHARMACY_REPOSITORY)
    private readonly repository: PharmacyRepository,
  ) {}

  async execute(id: string, dto: UpdatePharmacyDto) {
    const pharmacy = await this.repository.findById(id);

    if (!pharmacy) {
      throw new NotFoundException('Farmacia no encontrada');
    }

    if (dto.name && dto.name !== pharmacy.name) {
      const exists = await this.repository.findByName(dto.name);

      if (exists) {
        throw new BadRequestException('La farmacia ya existe');
      }
    }

    return this.repository.update(id, dto);
  }
}
