import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { VALIDATION_RESULTS_REPOSITORY } from '../../domain/repositories/validation-results.repository';
import type { ValidationResultsRepository } from '../../domain/repositories/validation-results.repository';

@Injectable()
export class GetValidationResultByIdUseCase {
  constructor(
    @Inject(VALIDATION_RESULTS_REPOSITORY)
    private readonly repository: ValidationResultsRepository,
  ) {}

  async execute(id: string) {
    const item = await this.repository.findById(id);

    if (!item) {
      throw new NotFoundException('Resultado de validación no encontrado');
    }

    return item;
  }
}
