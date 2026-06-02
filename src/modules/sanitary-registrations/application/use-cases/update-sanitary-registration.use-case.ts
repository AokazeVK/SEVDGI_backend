import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { UpdateSanitaryRegistrationDto } from '../dto/update-sanitary-registration.dto';
import { SANITARY_REGISTRATIONS_REPOSITORY } from '../../domain/repositories/sanitary-registrations.repository';
import type { SanitaryRegistrationsRepository } from '../../domain/repositories/sanitary-registrations.repository';

@Injectable()
export class UpdateSanitaryRegistrationUseCase {
  constructor(
    @Inject(SANITARY_REGISTRATIONS_REPOSITORY)
    private readonly repository: SanitaryRegistrationsRepository,
  ) {}

  async execute(id: string, dto: UpdateSanitaryRegistrationDto) {
    const item = await this.repository.findById(id);

    if (!item) {
      throw new NotFoundException('Registro sanitario no encontrado');
    }

    if (dto.registrationNumber && dto.registrationNumber !== item.registrationNumber) {
      const exists = await this.repository.findByRegistrationNumber(dto.registrationNumber);

      if (exists) {
        throw new BadRequestException('Ya existe un registro sanitario con ese número');
      }
    }

    return this.repository.update(id, {
      medicineId: dto.medicineId,
      laboratoryId: dto.laboratoryId,
      registrationNumber: dto.registrationNumber,
      issuedAt: dto.issuedAt ? new Date(dto.issuedAt) : undefined,
      expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined,
    });
  }
}
