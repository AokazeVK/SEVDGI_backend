import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePharmaceuticalFormDto } from '../dto/update-pharmaceutical-form.dto';
import { PHARMACEUTICAL_FORMS_REPOSITORY } from '../../domain/repositories/pharmaceutical-forms.repository';
import type { PharmaceuticalFormsRepository } from '../../domain/repositories/pharmaceutical-forms.repository';

@Injectable()
export class UpdatePharmaceuticalFormUseCase {
  constructor(
    @Inject(PHARMACEUTICAL_FORMS_REPOSITORY)
    private readonly repository: PharmaceuticalFormsRepository,
  ) {}

  async execute(id: string, dto: UpdatePharmaceuticalFormDto) {
    const item = await this.repository.findById(id);

    if (!item) {
      throw new NotFoundException('Forma farmacéutica no encontrada');
    }

    if (dto.name && dto.name !== item.name) {
      const exists = await this.repository.findByName(dto.name);

      if (exists) {
        throw new BadRequestException('La forma farmacéutica ya existe');
      }
    }

    return this.repository.update(id, dto);
  }
}
