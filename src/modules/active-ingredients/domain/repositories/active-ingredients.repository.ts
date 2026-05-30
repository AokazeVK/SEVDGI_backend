import { ActiveIngredientEntity } from '../entities/active-ingredient.entity';

export const ACTIVE_INGREDIENTS_REPOSITORY = Symbol('ACTIVE_INGREDIENTS_REPOSITORY');

export interface CreateActiveIngredientData {
  name: string;
  description?: string;
}

export interface UpdateActiveIngredientData {
  name?: string;
  description?: string;
}

export interface ActiveIngredientsRepository {
  findAll(): Promise<ActiveIngredientEntity[]>;
  findById(id: string): Promise<ActiveIngredientEntity | null>;
  findByName(name: string): Promise<ActiveIngredientEntity | null>;
  create(data: CreateActiveIngredientData): Promise<ActiveIngredientEntity>;
  update(id: string, data: UpdateActiveIngredientData): Promise<ActiveIngredientEntity>;
  toggle(id: string): Promise<ActiveIngredientEntity>;
}
