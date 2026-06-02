import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { CreateDoctorDto } from '../dto/create-doctor.dto';
import { DOCTORS_REPOSITORY } from '../../domain/repositories/doctors.repository';
import type { DoctorsRepository } from '../../domain/repositories/doctors.repository';

@Injectable()
export class CreateDoctorUseCase {
  constructor(
    @Inject(DOCTORS_REPOSITORY)
    private readonly repository: DoctorsRepository,
  ) {}

  async execute(dto: CreateDoctorDto) {
    if (dto.licenseNumber) {
      const exists = await this.repository.findByLicenseNumber(dto.licenseNumber);

      if (exists) {
        throw new BadRequestException('Ya existe un médico con ese número de matrícula');
      }
    }

    return this.repository.create(dto);
  }
}
