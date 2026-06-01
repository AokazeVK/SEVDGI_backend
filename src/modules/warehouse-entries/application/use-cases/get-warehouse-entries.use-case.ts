import { Inject, Injectable } from '@nestjs/common';
import { WAREHOUSE_ENTRIES_REPOSITORY } from '../../domain/repositories/warehouse-entries.repository';
import type { WarehouseEntriesRepository } from '../../domain/repositories/warehouse-entries.repository';

@Injectable()
export class GetWarehouseEntriesUseCase {
  constructor(
    @Inject(WAREHOUSE_ENTRIES_REPOSITORY)
    private readonly repository: WarehouseEntriesRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
