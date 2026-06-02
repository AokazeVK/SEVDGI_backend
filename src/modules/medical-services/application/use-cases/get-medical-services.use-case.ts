import { Inject, Injectable } from '@nestjs/common';

import type { MedicalServicesRepository } from '../../domain/repositories/medical-services.repository';
import { MEDICAL_SERVICES_REPOSITORY } from '../../domain/repositories/medical-services.repository';

@Injectable()
export class GetMedicalServicesUseCase {
  constructor(
    @Inject(MEDICAL_SERVICES_REPOSITORY)
    private readonly repository: MedicalServicesRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
