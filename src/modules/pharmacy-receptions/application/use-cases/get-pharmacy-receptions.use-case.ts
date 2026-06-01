import { Inject, Injectable } from '@nestjs/common';

import { PHARMACY_RECEPTIONS_REPOSITORY } from '../../domain/repositories/pharmacy-receptions.repository';
import type { PharmacyReceptionsRepository } from '../../domain/repositories/pharmacy-receptions.repository';

@Injectable()
export class GetPharmacyReceptionsUseCase {
  constructor(
    @Inject(PHARMACY_RECEPTIONS_REPOSITORY)
    private readonly repository: PharmacyReceptionsRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
