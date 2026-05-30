import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreatePharmaceuticalFormDto } from '../dto/create-pharmaceutical-form.dto';
import { PHARMACEUTICAL_FORMS_REPOSITORY } from '../../domain/repositories/pharmaceutical-forms.repository';
import type { PharmaceuticalFormsRepository } from '../../domain/repositories/pharmaceutical-forms.repository';

@Injectable()
export class CreatePharmaceuticalFormUseCase {
  constructor(
    @Inject(PHARMACEUTICAL_FORMS_REPOSITORY)
    private readonly repository: PharmaceuticalFormsRepository,
  ) {}

  async execute(dto: CreatePharmaceuticalFormDto) {
    const exists = await this.repository.findByName(dto.name);

    if (exists) {
      throw new BadRequestException('La forma farmacéutica ya existe');
    }

    return this.repository.create(dto);
  }
}
