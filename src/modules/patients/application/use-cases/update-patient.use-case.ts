import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { UpdatePatientDto } from '../dto/update-patient.dto';
import { PATIENTS_REPOSITORY } from '../../domain/repositories/patients.repository';
import type { PatientsRepository } from '../../domain/repositories/patients.repository';

@Injectable()
export class UpdatePatientUseCase {
  constructor(
    @Inject(PATIENTS_REPOSITORY)
    private readonly repository: PatientsRepository,
  ) {}

  async execute(id: string, dto: UpdatePatientDto) {
    const patient = await this.repository.findById(id);

    if (!patient) {
      throw new NotFoundException('Paciente no encontrado');
    }

    if (dto.ci && dto.ci !== patient.ci) {
      const exists = await this.repository.findByCi(dto.ci);

      if (exists) {
        throw new BadRequestException('Ya existe un paciente con ese CI');
      }
    }

    return this.repository.update(id, {
      ci: dto.ci,
      fullName: dto.fullName,
      birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
      phone: dto.phone,
      address: dto.address,
    });
  }
}
