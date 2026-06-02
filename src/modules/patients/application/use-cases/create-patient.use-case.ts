import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { CreatePatientDto } from '../dto/create-patient.dto';
import { PATIENTS_REPOSITORY } from '../../domain/repositories/patients.repository';
import type { PatientsRepository } from '../../domain/repositories/patients.repository';

@Injectable()
export class CreatePatientUseCase {
  constructor(
    @Inject(PATIENTS_REPOSITORY)
    private readonly repository: PatientsRepository,
  ) {}

  async execute(dto: CreatePatientDto) {
    if (dto.ci) {
      const exists = await this.repository.findByCi(dto.ci);

      if (exists) {
        throw new BadRequestException('Ya existe un paciente con ese CI');
      }
    }

    return this.repository.create({
      ci: dto.ci,
      fullName: dto.fullName,
      birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
      phone: dto.phone,
      address: dto.address,
    });
  }
}
