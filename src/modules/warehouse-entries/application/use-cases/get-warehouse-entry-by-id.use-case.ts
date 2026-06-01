import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { WAREHOUSE_ENTRIES_REPOSITORY } from '../../domain/repositories/warehouse-entries.repository';
import type { WarehouseEntriesRepository } from '../../domain/repositories/warehouse-entries.repository';

@Injectable()
export class GetWarehouseEntryByIdUseCase {
  constructor(
    @Inject(WAREHOUSE_ENTRIES_REPOSITORY)
    private readonly repository: WarehouseEntriesRepository,
  ) {}

  async execute(id: string) {
    const entry = await this.repository.findById(id);

    if (!entry) {
      throw new NotFoundException('Ingreso de almacén no encontrado');
    }

    return entry;
  }
}
