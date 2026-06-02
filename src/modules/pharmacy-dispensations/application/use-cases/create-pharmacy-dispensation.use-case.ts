import { Inject, Injectable } from '@nestjs/common';

import { CreatePharmacyDispensationDto } from '../dto/create-pharmacy-dispensation.dto';
import { PHARMACY_DISPENSATIONS_REPOSITORY } from '../../domain/repositories/pharmacy-dispensations.repository';
import type { PharmacyDispensationsRepository } from '../../domain/repositories/pharmacy-dispensations.repository';

@Injectable()
export class CreatePharmacyDispensationUseCase {
  constructor(
    @Inject(PHARMACY_DISPENSATIONS_REPOSITORY)
    private readonly repository: PharmacyDispensationsRepository,
  ) {}

  execute(dto: CreatePharmacyDispensationDto) {
    return this.repository.create(dto);
  }
}
