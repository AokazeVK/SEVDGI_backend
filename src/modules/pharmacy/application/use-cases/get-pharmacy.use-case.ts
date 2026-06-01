import { Inject, Injectable } from '@nestjs/common';

import { PHARMACY_REPOSITORY } from '../../domain/repositories/pharmacy.repository';
import type { PharmacyRepository } from '../../domain/repositories/pharmacy.repository';

@Injectable()
export class GetPharmacyUseCase {
  constructor(
    @Inject(PHARMACY_REPOSITORY)
    private readonly repository: PharmacyRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
