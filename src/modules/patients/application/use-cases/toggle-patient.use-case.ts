import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { PATIENTS_REPOSITORY } from '../../domain/repositories/patients.repository';
import type { PatientsRepository } from '../../domain/repositories/patients.repository';

@Injectable()
export class TogglePatientUseCase {
  constructor(
    @Inject(PATIENTS_REPOSITORY)
    private readonly repository: PatientsRepository,
  ) {}

  async execute(id: string) {
    const patient = await this.repository.findById(id);

    if (!patient) {
      throw new NotFoundException('Paciente no encontrado');
    }

    return this.repository.toggle(id);
  }
}
