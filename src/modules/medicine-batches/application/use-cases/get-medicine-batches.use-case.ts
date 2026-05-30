import { Inject, Injectable } from '@nestjs/common';
import { MEDICINE_BATCHES_REPOSITORY } from '../../domain/repositories/medicine-batches.repository';
import type { MedicineBatchesRepository } from '../../domain/repositories/medicine-batches.repository';

@Injectable()
export class GetMedicineBatchesUseCase {
  constructor(
    @Inject(MEDICINE_BATCHES_REPOSITORY)
    private readonly repository: MedicineBatchesRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
