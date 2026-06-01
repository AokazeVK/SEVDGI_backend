import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { WAREHOUSE_REPOSITORY } from '../../domain/repositories/warehouse.repository';
import type { WarehouseRepository } from '../../domain/repositories/warehouse.repository';

@Injectable()
export class GetWarehouseByIdUseCase {
  constructor(
    @Inject(WAREHOUSE_REPOSITORY)
    private readonly repository: WarehouseRepository,
  ) {}

  async execute(id: string) {
    const warehouse = await this.repository.findById(id);

    if (!warehouse) {
      throw new NotFoundException('Almacén no encontrado');
    }

    return warehouse;
  }
}
