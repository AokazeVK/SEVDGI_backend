import { Inject, Injectable } from '@nestjs/common';

import { PHARMACY_DISPENSATIONS_REPOSITORY } from '../../domain/repositories/pharmacy-dispensations.repository';
import type { PharmacyDispensationsRepository } from '../../domain/repositories/pharmacy-dispensations.repository';

@Injectable()
export class GetPharmacyDispensationsUseCase {
  constructor(
    @Inject(PHARMACY_DISPENSATIONS_REPOSITORY)
    private readonly repository: PharmacyDispensationsRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
