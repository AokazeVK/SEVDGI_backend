import { Inject, Injectable } from '@nestjs/common';
import { WAREHOUSE_REPOSITORY } from '../../domain/repositories/warehouse.repository';
import type { WarehouseRepository } from '../../domain/repositories/warehouse.repository';

@Injectable()
export class GetWarehouseUseCase {
  constructor(
    @Inject(WAREHOUSE_REPOSITORY)
    private readonly repository: WarehouseRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
