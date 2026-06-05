import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { UpdateValidationProcessStatusDto } from '../dto/update-validation-process-status.dto';
import { VALIDATION_PROCESSES_REPOSITORY } from '../../domain/repositories/validation-processes.repository';
import type { ValidationProcessesRepository } from '../../domain/repositories/validation-processes.repository';

@Injectable()
export class UpdateValidationProcessStatusUseCase {
  constructor(
    @Inject(VALIDATION_PROCESSES_REPOSITORY)
    private readonly repository: ValidationProcessesRepository,
  ) {}

  async execute(id: string, dto: UpdateValidationProcessStatusDto) {
    const item = await this.repository.findById(id);

    if (!item) {
      throw new NotFoundException('Proceso de validación no encontrado');
    }

    return this.repository.updateStatus(id, {
      status: dto.status,
    });
  }
}
