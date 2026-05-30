import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ACTIVE_INGREDIENTS_REPOSITORY } from '../../domain/repositories/active-ingredients.repository';
import type { ActiveIngredientsRepository } from '../../domain/repositories/active-ingredients.repository';

@Injectable()
export class GetActiveIngredientByIdUseCase {
  constructor(
    @Inject(ACTIVE_INGREDIENTS_REPOSITORY)
    private readonly repository: ActiveIngredientsRepository,
  ) {}

  async execute(id: string) {
    const item = await this.repository.findById(id);

    if (!item) {
      throw new NotFoundException('Principio activo no encontrado');
    }

    return item;
  }
}
