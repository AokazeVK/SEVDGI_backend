import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { CreateSanitaryRegistrationDto } from '../dto/create-sanitary-registration.dto';
import { SANITARY_REGISTRATIONS_REPOSITORY } from '../../domain/repositories/sanitary-registrations.repository';
import type { SanitaryRegistrationsRepository } from '../../domain/repositories/sanitary-registrations.repository';

@Injectable()
export class CreateSanitaryRegistrationUseCase {
  constructor(
    @Inject(SANITARY_REGISTRATIONS_REPOSITORY)
    private readonly repository: SanitaryRegistrationsRepository,
  ) {}

  async execute(dto: CreateSanitaryRegistrationDto) {
    const exists = await this.repository.findByRegistrationNumber(dto.registrationNumber);

    if (exists) {
      throw new BadRequestException('Ya existe un registro sanitario con ese número');
    }

    return this.repository.create({
      medicineId: dto.medicineId,
      laboratoryId: dto.laboratoryId,
      registrationNumber: dto.registrationNumber,
      issuedAt: dto.issuedAt ? new Date(dto.issuedAt) : undefined,
      expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined,
    });
  }
}
