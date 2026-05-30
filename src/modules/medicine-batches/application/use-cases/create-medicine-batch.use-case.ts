import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateMedicineBatchDto } from '../dto/create-medicine-batch.dto';
import { MEDICINE_BATCHES_REPOSITORY } from '../../domain/repositories/medicine-batches.repository';
import type { MedicineBatchesRepository } from '../../domain/repositories/medicine-batches.repository';

@Injectable()
export class CreateMedicineBatchUseCase {
  constructor(
    @Inject(MEDICINE_BATCHES_REPOSITORY)
    private readonly repository: MedicineBatchesRepository,
  ) {}

  async execute(dto: CreateMedicineBatchDto) {
    const exists = await this.repository.findByMedicineAndBatchNumber(
      dto.medicineId,
      dto.batchNumber,
    );

    if (exists) {
      throw new BadRequestException('El número de lote ya existe para este medicamento');
    }

    return this.repository.create({
      medicineId: dto.medicineId,
      batchNumber: dto.batchNumber,
      expirationDate: new Date(dto.expirationDate),
    });
  }
}
