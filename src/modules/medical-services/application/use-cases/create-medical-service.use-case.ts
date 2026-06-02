import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { CreateMedicalServiceDto } from '../dto/create-medical-service.dto';
import type { MedicalServicesRepository } from '../../domain/repositories/medical-services.repository';
import { MEDICAL_SERVICES_REPOSITORY } from '../../domain/repositories/medical-services.repository';

@Injectable()
export class CreateMedicalServiceUseCase {
  constructor(
    @Inject(MEDICAL_SERVICES_REPOSITORY)
    private readonly repository: MedicalServicesRepository,
  ) {}

  async execute(dto: CreateMedicalServiceDto) {
    const exists = await this.repository.findByName(dto.name);

    if (exists) {
      throw new BadRequestException('Ya existe un servicio médico con ese nombre');
    }

    return this.repository.create(dto);
  }
}
