import { Inject, Injectable } from '@nestjs/common';

import { CreatePharmacyReceptionDto } from '../dto/create-pharmacy-reception.dto';
import { PHARMACY_RECEPTIONS_REPOSITORY } from '../../domain/repositories/pharmacy-receptions.repository';
import type { PharmacyReceptionsRepository } from '../../domain/repositories/pharmacy-receptions.repository';

@Injectable()
export class CreatePharmacyReceptionUseCase {
  constructor(
    @Inject(PHARMACY_RECEPTIONS_REPOSITORY)
    private readonly repository: PharmacyReceptionsRepository,
  ) {}

  execute(dto: CreatePharmacyReceptionDto) {
    return this.repository.create(dto);
  }
}
