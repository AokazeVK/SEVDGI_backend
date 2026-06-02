import { Inject, Injectable } from '@nestjs/common';

import { PRESCRIPTIONS_REPOSITORY } from '../../domain/repositories/prescriptions.repository';
import type { PrescriptionsRepository } from '../../domain/repositories/prescriptions.repository';

@Injectable()
export class GetPrescriptionsUseCase {
  constructor(
    @Inject(PRESCRIPTIONS_REPOSITORY)
    private readonly repository: PrescriptionsRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
