import { createSelector } from '@ngxs/store';
import { IngredientsState } from './ingredients.state';
import { IngredientsStateModel } from './ingredients-state-model';

export abstract class IngredientsStateSelectors {
  public static ingredients = createSelector(
    [IngredientsState],
    (state: IngredientsStateModel) => state.ingredients
  );

  public static ingredientsLoading = createSelector(
    [IngredientsState],
    (state: IngredientsStateModel) => state.ingredientsLoading
  );

  public static ingredient = createSelector(
    [IngredientsState],
    (state: IngredientsStateModel) => state.selectedIngredient
  );

  public static ingredientLoading = createSelector(
    [IngredientsState],
    (state: IngredientsStateModel) => state.selectedIngredientLoading
  );
}
