import { Module } from '@nestjs/common';

import { ACTIVE_INGREDIENTS_REPOSITORY } from './domain/repositories/active-ingredients.repository';
import { PrismaActiveIngredientsRepository } from './infrastructure/repositories/prisma-active-ingredients.repository';

import { ActiveIngredientsController } from './infrastructure/controllers/active-ingredients.controller';

import { GetActiveIngredientsUseCase } from './application/use-cases/get-active-ingredients.use-case';
import { GetActiveIngredientByIdUseCase } from './application/use-cases/get-active-ingredient-by-id.use-case';
import { CreateActiveIngredientUseCase } from './application/use-cases/create-active-ingredient.use-case';
import { UpdateActiveIngredientUseCase } from './application/use-cases/update-active-ingredient.use-case';
import { ToggleActiveIngredientUseCase } from './application/use-cases/toggle-active-ingredient.use-case';

@Module({
  controllers: [ActiveIngredientsController],
  providers: [
    GetActiveIngredientsUseCase,
    GetActiveIngredientByIdUseCase,
    CreateActiveIngredientUseCase,
    UpdateActiveIngredientUseCase,
    ToggleActiveIngredientUseCase,
    {
      provide: ACTIVE_INGREDIENTS_REPOSITORY,
      useClass: PrismaActiveIngredientsRepository,
    },
  ],
})
export class ActiveIngredientsModule {}
