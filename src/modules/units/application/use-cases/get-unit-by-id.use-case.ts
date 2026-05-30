import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UNITS_REPOSITORY } from '../../domain/repositories/units.repository';
import type { UnitsRepository } from '../../domain/repositories/units.repository';

@Injectable()
export class GetUnitByIdUseCase {
  constructor(
    @Inject(UNITS_REPOSITORY)
    private readonly repository: UnitsRepository,
  ) {}

  async execute(id: string) {
    const unit = await this.repository.findById(id);

    if (!unit) {
      throw new NotFoundException('Unidad no encontrada');
    }

    return unit;
  }
}
