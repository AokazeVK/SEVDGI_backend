import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateWarehouseDto } from '../dto/update-warehouse.dto';
import { WAREHOUSE_REPOSITORY } from '../../domain/repositories/warehouse.repository';
import type { WarehouseRepository } from '../../domain/repositories/warehouse.repository';

@Injectable()
export class UpdateWarehouseUseCase {
  constructor(
    @Inject(WAREHOUSE_REPOSITORY)
    private readonly repository: WarehouseRepository,
  ) {}

  async execute(id: string, dto: UpdateWarehouseDto) {
    const warehouse = await this.repository.findById(id);

    if (!warehouse) {
      throw new NotFoundException('Almacén no encontrado');
    }

    if (dto.name && dto.name !== warehouse.name) {
      const exists = await this.repository.findByName(dto.name);

      if (exists) {
        throw new BadRequestException('El almacén ya existe');
      }
    }

    return this.repository.update(id, dto);
  }
}
