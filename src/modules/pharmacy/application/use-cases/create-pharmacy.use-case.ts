import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { CreatePharmacyDto } from '../dto/create-pharmacy.dto';
import { PHARMACY_REPOSITORY } from '../../domain/repositories/pharmacy.repository';
import type { PharmacyRepository } from '../../domain/repositories/pharmacy.repository';

@Injectable()
export class CreatePharmacyUseCase {
  constructor(
    @Inject(PHARMACY_REPOSITORY)
    private readonly repository: PharmacyRepository,
  ) {}

  async execute(dto: CreatePharmacyDto) {
    const exists = await this.repository.findByName(dto.name);

    if (exists) {
      throw new BadRequestException('La farmacia ya existe');
    }

    return this.repository.create(dto);
  }
}
