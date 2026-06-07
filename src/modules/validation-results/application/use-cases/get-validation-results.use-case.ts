import { Inject, Injectable } from '@nestjs/common';

import { VALIDATION_RESULTS_REPOSITORY } from '../../domain/repositories/validation-results.repository';
import type { ValidationResultsRepository } from '../../domain/repositories/validation-results.repository';

@Injectable()
export class GetValidationResultsUseCase {
  constructor(
    @Inject(VALIDATION_RESULTS_REPOSITORY)
    private readonly repository: ValidationResultsRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
