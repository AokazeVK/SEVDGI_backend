import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateActiveIngredientDto } from '../dto/create-active-ingredient.dto';
import { ACTIVE_INGREDIENTS_REPOSITORY } from '../../domain/repositories/active-ingredients.repository';
import type { ActiveIngredientsRepository } from '../../domain/repositories/active-ingredients.repository';

@Injectable()
export class CreateActiveIngredientUseCase {
  constructor(
    @Inject(ACTIVE_INGREDIENTS_REPOSITORY)
    private readonly repository: ActiveIngredientsRepository,
  ) {}

  async execute(dto: CreateActiveIngredientDto) {
    const exists = await this.repository.findByName(dto.name);

    if (exists) {
      throw new BadRequestException('El principio activo ya existe');
    }

    return this.repository.create(dto);
  }
}
