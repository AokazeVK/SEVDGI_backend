import { Inject, Injectable } from '@nestjs/common';

import { SANITARY_REGISTRATIONS_REPOSITORY } from '../../domain/repositories/sanitary-registrations.repository';
import type { SanitaryRegistrationsRepository } from '../../domain/repositories/sanitary-registrations.repository';

@Injectable()
export class GetSanitaryRegistrationsUseCase {
  constructor(
    @Inject(SANITARY_REGISTRATIONS_REPOSITORY)
    private readonly repository: SanitaryRegistrationsRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
