import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateActiveIngredientDto } from '../dto/update-active-ingredient.dto';
import { ACTIVE_INGREDIENTS_REPOSITORY } from '../../domain/repositories/active-ingredients.repository';
import type { ActiveIngredientsRepository } from '../../domain/repositories/active-ingredients.repository';

@Injectable()
export class UpdateActiveIngredientUseCase {
  constructor(
    @Inject(ACTIVE_INGREDIENTS_REPOSITORY)
    private readonly repository: ActiveIngredientsRepository,
  ) {}

  async execute(id: string, dto: UpdateActiveIngredientDto) {
    const item = await this.repository.findById(id);

    if (!item) {
      throw new NotFoundException('Principio activo no encontrado');
    }

    if (dto.name && dto.name !== item.name) {
      const exists = await this.repository.findByName(dto.name);

      if (exists) {
        throw new BadRequestException('El principio activo ya existe');
      }
    }

    return this.repository.update(id, dto);
  }
}
