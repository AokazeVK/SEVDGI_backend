import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { DOCTORS_REPOSITORY } from '../../domain/repositories/doctors.repository';
import type { DoctorsRepository } from '../../domain/repositories/doctors.repository';

@Injectable()
export class GetDoctorByIdUseCase {
  constructor(
    @Inject(DOCTORS_REPOSITORY)
    private readonly repository: DoctorsRepository,
  ) {}

  async execute(id: string) {
    const doctor = await this.repository.findById(id);

    if (!doctor) {
      throw new NotFoundException('Médico no encontrado');
    }

    return doctor;
  }
}
