import { Inject, Injectable } from '@nestjs/common';

import { VALIDATION_RESULTS_REPOSITORY } from '../../domain/repositories/validation-results.repository';
import type { ValidationResultsRepository } from '../../domain/repositories/validation-results.repository';

@Injectable()
export class GetValidationResultsByProcessUseCase {
  constructor(
    @Inject(VALIDATION_RESULTS_REPOSITORY)
    private readonly repository: ValidationResultsRepository,
  ) {}

  execute(processId: string) {
    return this.repository.findByProcess(processId);
  }
}
