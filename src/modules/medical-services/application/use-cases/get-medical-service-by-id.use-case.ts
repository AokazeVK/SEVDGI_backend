import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import type { MedicalServicesRepository } from '../../domain/repositories/medical-services.repository';
import { MEDICAL_SERVICES_REPOSITORY } from '../../domain/repositories/medical-services.repository';

@Injectable()
export class GetMedicalServiceByIdUseCase {
  constructor(
    @Inject(MEDICAL_SERVICES_REPOSITORY)
    private readonly repository: MedicalServicesRepository,
  ) {}

  async execute(id: string) {
    const service = await this.repository.findById(id);

    if (!service) {
      throw new NotFoundException('Servicio médico no encontrado');
    }

    return service;
  }
}
