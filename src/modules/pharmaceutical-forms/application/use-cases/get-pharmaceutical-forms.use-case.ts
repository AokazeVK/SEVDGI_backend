import { Inject, Injectable } from '@nestjs/common';
import { PHARMACEUTICAL_FORMS_REPOSITORY } from '../../domain/repositories/pharmaceutical-forms.repository';
import type { PharmaceuticalFormsRepository } from '../../domain/repositories/pharmaceutical-forms.repository';

@Injectable()
export class GetPharmaceuticalFormsUseCase {
  constructor(
    @Inject(PHARMACEUTICAL_FORMS_REPOSITORY)
    private readonly repository: PharmaceuticalFormsRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
