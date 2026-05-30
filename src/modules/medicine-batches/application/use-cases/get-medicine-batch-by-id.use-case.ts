import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MEDICINE_BATCHES_REPOSITORY } from '../../domain/repositories/medicine-batches.repository';
import type { MedicineBatchesRepository } from '../../domain/repositories/medicine-batches.repository';

@Injectable()
export class GetMedicineBatchByIdUseCase {
  constructor(
    @Inject(MEDICINE_BATCHES_REPOSITORY)
    private readonly repository: MedicineBatchesRepository,
  ) {}

  async execute(id: string) {
    const batch = await this.repository.findById(id);

    if (!batch) {
      throw new NotFoundException('Lote de medicamento no encontrado');
    }

    return batch;
  }
}
