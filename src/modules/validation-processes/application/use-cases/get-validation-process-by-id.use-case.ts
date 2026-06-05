import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { VALIDATION_PROCESSES_REPOSITORY } from '../../domain/repositories/validation-processes.repository';
import type { ValidationProcessesRepository } from '../../domain/repositories/validation-processes.repository';

@Injectable()
export class GetValidationProcessByIdUseCase {
  constructor(
    @Inject(VALIDATION_PROCESSES_REPOSITORY)
    private readonly repository: ValidationProcessesRepository,
  ) {}

  async execute(id: string) {
    const item = await this.repository.findById(id);

    if (!item) {
      throw new NotFoundException('Proceso de validación no encontrado');
    }

    return item;
  }
}
