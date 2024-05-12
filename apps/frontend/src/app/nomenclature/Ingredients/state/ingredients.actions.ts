import { PaginatedQueryModel } from '@bakery-information-system/web/shared';
import { CreateIngredientModel } from '../models';
import { UpdateIngredientParamsType } from '../types';

export class LoadIngredients {
  public static type = '[INGREDIENTS] load ingredients';

  public constructor(public payload?: { paginated?: PaginatedQueryModel }) {}
}

export class LoadIngredient {
  public static type = '[INGREDIENTS] load ingredient';

  constructor(public payload: { id: string }) {}
}

export class CreateIngredient {
  public static type = '[INGREDIENTS] create ingredient';
  constructor(public payload: { model: CreateIngredientModel }) {}
}

export class UpdateIngredient {
  public static type = '[INGREDIENTS] update ingredient';
  constructor(public payload: UpdateIngredientParamsType) {}
}

export class RemoveIngredient {
  public static type = '[INGREDIENTS] remove ingredient';
  constructor(public payload: { id: string }) {}
}
