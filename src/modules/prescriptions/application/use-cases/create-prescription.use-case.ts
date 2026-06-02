import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { CreatePrescriptionDto } from '../dto/create-prescription.dto';
import { PRESCRIPTIONS_REPOSITORY } from '../../domain/repositories/prescriptions.repository';
import type { PrescriptionsRepository } from '../../domain/repositories/prescriptions.repository';

@Injectable()
export class CreatePrescriptionUseCase {
  constructor(
    @Inject(PRESCRIPTIONS_REPOSITORY)
    private readonly repository: PrescriptionsRepository,
  ) {}

  async execute(dto: CreatePrescriptionDto) {
    if (!dto.details || dto.details.length === 0) {
      throw new BadRequestException('La receta debe tener al menos un medicamento');
    }

    if (dto.prescriptionNumber) {
      const exists = await this.repository.findByPrescriptionNumber(dto.prescriptionNumber);

      if (exists) {
        throw new BadRequestException('Ya existe una receta con ese número');
      }
    }

    return this.repository.create({
      patientId: dto.patientId,
      doctorId: dto.doctorId,
      medicalServiceId: dto.medicalServiceId,
      prescriptionNumber: dto.prescriptionNumber,
      issuedAt: dto.issuedAt ? new Date(dto.issuedAt) : undefined,
      diagnosis: dto.diagnosis,
      observation: dto.observation,
      details: dto.details,
    });
  }
}
