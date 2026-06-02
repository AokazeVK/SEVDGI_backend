import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { UpdateMedicalServiceDto } from '../dto/update-medical-service.dto';

import type { MedicalServicesRepository } from '../../domain/repositories/medical-services.repository';
import { MEDICAL_SERVICES_REPOSITORY } from '../../domain/repositories/medical-services.repository';

@Injectable()
export class UpdateMedicalServiceUseCase {
  constructor(
    @Inject(MEDICAL_SERVICES_REPOSITORY)
    private readonly repository: MedicalServicesRepository,
  ) {}

  async execute(id: string, dto: UpdateMedicalServiceDto) {
    const service = await this.repository.findById(id);

    if (!service) {
      throw new NotFoundException('Servicio médico no encontrado');
    }

    if (dto.name && dto.name !== service.name) {
      const exists = await this.repository.findByName(dto.name);

      if (exists) {
        throw new BadRequestException('Ya existe un servicio médico con ese nombre');
      }
    }

    return this.repository.update(id, dto);
  }
}
