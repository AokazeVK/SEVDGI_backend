import { Inject, Injectable } from '@nestjs/common';
import { ACTIVE_INGREDIENTS_REPOSITORY } from '../../domain/repositories/active-ingredients.repository';
import type { ActiveIngredientsRepository } from '../../domain/repositories/active-ingredients.repository';

@Injectable()
export class GetActiveIngredientsUseCase {
  constructor(
    @Inject(ACTIVE_INGREDIENTS_REPOSITORY)
    private readonly repository: ActiveIngredientsRepository,
  ) {}

  execute() {
    return this.repository.findAll();
  }
}
