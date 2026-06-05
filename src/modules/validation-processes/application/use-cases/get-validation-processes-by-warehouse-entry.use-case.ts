import { Inject, Injectable } from '@nestjs/common';

import { VALIDATION_PROCESSES_REPOSITORY } from '../../domain/repositories/validation-processes.repository';
import type { ValidationProcessesRepository } from '../../domain/repositories/validation-processes.repository';

@Injectable()
export class GetValidationProcessesByWarehouseEntryUseCase {
  constructor(
    @Inject(VALIDATION_PROCESSES_REPOSITORY)
    private readonly repository: ValidationProcessesRepository,
  ) {}

  execute(warehouseEntryId: string) {
    return this.repository.findByWarehouseEntry(warehouseEntryId);
  }
}
