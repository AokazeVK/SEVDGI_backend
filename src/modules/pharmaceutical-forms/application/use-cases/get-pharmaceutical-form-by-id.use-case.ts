import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PHARMACEUTICAL_FORMS_REPOSITORY } from '../../domain/repositories/pharmaceutical-forms.repository';
import type { PharmaceuticalFormsRepository } from '../../domain/repositories/pharmaceutical-forms.repository';

@Injectable()
export class GetPharmaceuticalFormByIdUseCase {
  constructor(
    @Inject(PHARMACEUTICAL_FORMS_REPOSITORY)
    private readonly repository: PharmaceuticalFormsRepository,
  ) {}

  async execute(id: string) {
    const item = await this.repository.findById(id);

    if (!item) {
      throw new NotFoundException('Forma farmacéutica no encontrada');
    }

    return item;
  }
}
