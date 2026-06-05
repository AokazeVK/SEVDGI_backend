import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { CreateValidationProcessDto } from '../dto/create-validation-process.dto';
import { VALIDATION_PROCESSES_REPOSITORY } from '../../domain/repositories/validation-processes.repository';
import type { ValidationProcessesRepository } from '../../domain/repositories/validation-processes.repository';

@Injectable()
export class CreateValidationProcessUseCase {
  constructor(
    @Inject(VALIDATION_PROCESSES_REPOSITORY)
    private readonly repository: ValidationProcessesRepository,
  ) {}

  execute(dto: CreateValidationProcessDto) {
    if (!dto.documentId && !dto.warehouseEntryId) {
      throw new BadRequestException('Debe enviar documentId o warehouseEntryId');
    }

    return this.repository.create(dto);
  }
}
