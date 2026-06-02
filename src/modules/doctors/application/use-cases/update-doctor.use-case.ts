import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { UpdateDoctorDto } from '../dto/update-doctor.dto';
import { DOCTORS_REPOSITORY } from '../../domain/repositories/doctors.repository';
import type { DoctorsRepository } from '../../domain/repositories/doctors.repository';

@Injectable()
export class UpdateDoctorUseCase {
  constructor(
    @Inject(DOCTORS_REPOSITORY)
    private readonly repository: DoctorsRepository,
  ) {}

  async execute(id: string, dto: UpdateDoctorDto) {
    const doctor = await this.repository.findById(id);

    if (!doctor) {
      throw new NotFoundException('Médico no encontrado');
    }

    if (dto.licenseNumber && dto.licenseNumber !== doctor.licenseNumber) {
      const exists = await this.repository.findByLicenseNumber(dto.licenseNumber);

      if (exists) {
        throw new BadRequestException('Ya existe un médico con ese número de matrícula');
      }
    }

    return this.repository.update(id, dto);
  }
}
