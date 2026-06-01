import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateWarehouseEntryDto } from '../dto/create-warehouse-entry.dto';
import { WAREHOUSE_ENTRIES_REPOSITORY } from '../../domain/repositories/warehouse-entries.repository';
import type { WarehouseEntriesRepository } from '../../domain/repositories/warehouse-entries.repository';

@Injectable()
export class CreateWarehouseEntryUseCase {
  constructor(
    @Inject(WAREHOUSE_ENTRIES_REPOSITORY)
    private readonly repository: WarehouseEntriesRepository,
  ) {}

  async execute(dto: CreateWarehouseEntryDto) {
    if (dto.entryNumber) {
      const exists = await this.repository.findByEntryNumber(dto.entryNumber);

      if (exists) {
        throw new BadRequestException('El número de ingreso ya existe');
      }
    }

    return this.repository.create({
      supplierId: dto.supplierId,
      warehouseId: dto.warehouseId,
      entryNumber: dto.entryNumber,
      invoiceNumber: dto.invoiceNumber,
      entryDate: dto.entryDate ? new Date(dto.entryDate) : undefined,
      details: dto.details,
    });
  }
}
