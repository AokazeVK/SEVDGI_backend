import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateWarehouseEntryDto } from '../dto/update-warehouse-entry.dto';
import { WAREHOUSE_ENTRIES_REPOSITORY } from '../../domain/repositories/warehouse-entries.repository';
import type { WarehouseEntriesRepository } from '../../domain/repositories/warehouse-entries.repository';

@Injectable()
export class UpdateWarehouseEntryUseCase {
  constructor(
    @Inject(WAREHOUSE_ENTRIES_REPOSITORY)
    private readonly repository: WarehouseEntriesRepository,
  ) {}

  async execute(id: string, dto: UpdateWarehouseEntryDto) {
    const entry = await this.repository.findById(id);

    if (!entry) {
      throw new NotFoundException('Ingreso de almacén no encontrado');
    }

    if (dto.entryNumber && dto.entryNumber !== entry.entryNumber) {
      const exists = await this.repository.findByEntryNumber(dto.entryNumber);

      if (exists) {
        throw new BadRequestException('El número de ingreso ya existe');
      }
    }

    return this.repository.update(id, {
      supplierId: dto.supplierId,
      entryNumber: dto.entryNumber,
      invoiceNumber: dto.invoiceNumber,
      entryDate: dto.entryDate ? new Date(dto.entryDate) : undefined,
    });
  }
}
