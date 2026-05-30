import { Inject, Injectable } from '@nestjs/common';
import { UNITS_REPOSITORY } from '../../domain/repositories/units.repository';
import type { UnitsRepository } from '../../domain/repositories/units.repository';

@Injectable()
export class GetUnitsUseCase {
  constructor(
    @Inject(UNITS_REPOSITORY)
    private readonly repository: UnitsRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
