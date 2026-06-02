import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { SANITARY_REGISTRATIONS_REPOSITORY } from '../../domain/repositories/sanitary-registrations.repository';
import type { SanitaryRegistrationsRepository } from '../../domain/repositories/sanitary-registrations.repository';

@Injectable()
export class ToggleSanitaryRegistrationUseCase {
  constructor(
    @Inject(SANITARY_REGISTRATIONS_REPOSITORY)
    private readonly repository: SanitaryRegistrationsRepository,
  ) {}

  async execute(id: string) {
    const item = await this.repository.findById(id);

    if (!item) {
      throw new NotFoundException('Registro sanitario no encontrado');
    }

    return this.repository.toggle(id);
  }
}
