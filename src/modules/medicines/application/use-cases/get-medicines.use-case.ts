import { Inject, Injectable } from '@nestjs/common';
import { MEDICINES_REPOSITORY } from '../../domain/repositories/medicines.repository';
import type { MedicinesRepository } from '../../domain/repositories/medicines.repository';

@Injectable()
export class GetMedicinesUseCase {
  constructor(
    @Inject(MEDICINES_REPOSITORY)
    private readonly repository: MedicinesRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
