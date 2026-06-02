import { Inject, Injectable } from '@nestjs/common';

import { PATIENTS_REPOSITORY } from '../../domain/repositories/patients.repository';
import type { PatientsRepository } from '../../domain/repositories/patients.repository';

@Injectable()
export class GetPatientsUseCase {
  constructor(
    @Inject(PATIENTS_REPOSITORY)
    private readonly repository: PatientsRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
