import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUnitDto } from '../dto/create-unit.dto';
import { UNITS_REPOSITORY } from '../../domain/repositories/units.repository';
import type { UnitsRepository } from '../../domain/repositories/units.repository';

@Injectable()
export class CreateUnitUseCase {
  constructor(
    @Inject(UNITS_REPOSITORY)
    private readonly repository: UnitsRepository,
  ) {}

  async execute(dto: CreateUnitDto) {
    const nameExists = await this.repository.findByName(dto.name);

    if (nameExists) {
      throw new BadRequestException('La unidad ya existe');
    }

    const symbolExists = await this.repository.findBySymbol(dto.symbol);

    if (symbolExists) {
      throw new BadRequestException('El símbolo de unidad ya existe');
    }

    return this.repository.create(dto);
  }
}
