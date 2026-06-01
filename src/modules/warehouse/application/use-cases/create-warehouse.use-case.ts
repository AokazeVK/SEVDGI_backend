import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { WAREHOUSE_REPOSITORY } from '../../domain/repositories/warehouse.repository';
import type { WarehouseRepository } from '../../domain/repositories/warehouse.repository';

@Injectable()
export class CreateWarehouseUseCase {
  constructor(
    @Inject(WAREHOUSE_REPOSITORY)
    private readonly repository: WarehouseRepository,
  ) {}

  async execute(dto: CreateWarehouseDto) {
    const exists = await this.repository.findByName(dto.name);

    if (exists) {
      throw new BadRequestException('El almacén ya existe');
    }

    return this.repository.create(dto);
  }
}
