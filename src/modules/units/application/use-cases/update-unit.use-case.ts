import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUnitDto } from '../dto/update-unit.dto';
import { UNITS_REPOSITORY } from '../../domain/repositories/units.repository';
import type { UnitsRepository } from '../../domain/repositories/units.repository';

@Injectable()
export class UpdateUnitUseCase {
  constructor(
    @Inject(UNITS_REPOSITORY)
    private readonly repository: UnitsRepository,
  ) {}

  async execute(id: string, dto: UpdateUnitDto) {
    const unit = await this.repository.findById(id);

    if (!unit) {
      throw new NotFoundException('Unidad no encontrada');
    }

    if (dto.name && dto.name !== unit.name) {
      const nameExists = await this.repository.findByName(dto.name);

      if (nameExists) {
        throw new BadRequestException('La unidad ya existe');
      }
    }

    if (dto.symbol && dto.symbol !== unit.symbol) {
      const symbolExists = await this.repository.findBySymbol(dto.symbol);

      if (symbolExists) {
        throw new BadRequestException('El símbolo de unidad ya existe');
      }
    }

    return this.repository.update(id, dto);
  }
}
