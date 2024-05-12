import { Ingredient, IngredientDetailModel } from '../models';

export interface IngredientsStateModel {
  ingredients: {
    items: Ingredient[];
    total: number;
  };
  ingredientsLoading: boolean;
  selectedIngredient: IngredientDetailModel | null;
  selectedIngredientLoading: boolean;
}
