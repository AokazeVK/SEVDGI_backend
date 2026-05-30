import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMedicineBatchDto } from '../dto/update-medicine-batch.dto';
import { MEDICINE_BATCHES_REPOSITORY } from '../../domain/repositories/medicine-batches.repository';
import type { MedicineBatchesRepository } from '../../domain/repositories/medicine-batches.repository';

@Injectable()
export class UpdateMedicineBatchUseCase {
  constructor(
    @Inject(MEDICINE_BATCHES_REPOSITORY)
    private readonly repository: MedicineBatchesRepository,
  ) {}

  async execute(id: string, dto: UpdateMedicineBatchDto) {
    const batch = await this.repository.findById(id);

    if (!batch) {
      throw new NotFoundException('Lote de medicamento no encontrado');
    }

    if (dto.batchNumber && dto.batchNumber !== batch.batchNumber) {
      const exists = await this.repository.findByMedicineAndBatchNumber(
        batch.medicineId,
        dto.batchNumber,
      );

      if (exists) {
        throw new BadRequestException('El número de lote ya existe para este medicamento');
      }
    }

    return this.repository.update(id, {
      batchNumber: dto.batchNumber,
      expirationDate: dto.expirationDate ? new Date(dto.expirationDate) : undefined,
    });
  }
}
