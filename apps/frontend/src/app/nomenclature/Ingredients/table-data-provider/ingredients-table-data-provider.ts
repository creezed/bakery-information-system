import { inject, Injectable } from '@angular/core';
import {
  AbstractTableQueryDataProvider,
  TableOutputData,
} from '@bakery-information-system/web/ui';
import { map, mergeMap, switchMap } from 'rxjs';
import { Actions, ofAction, Store } from '@ngxs/store';
import { Ingredient } from '../models';
import { LoadIngredients, RemoveIngredient, UpdateIngredient } from '../state';
import { IngredientsStateSelectors } from '../state/ingredients-state.selectors';

@Injectable()
export class IngredientsTableQueryDataProvider extends AbstractTableQueryDataProvider<Ingredient> {
  private readonly _store = inject(Store);
  private readonly _actions$ = inject(Actions);

  public loadData(data: TableOutputData) {
    return this._actions$
      .pipe(ofAction(RemoveIngredient, UpdateIngredient, LoadIngredients))
      .pipe(
        mergeMap(() =>
          this._store
            .dispatch(
              new LoadIngredients({
                paginated: {
                  page: data.currentPage + 1,
                  limit: data.itemsPerPage,
                },
              })
            )
            .pipe(
              switchMap(() =>
                this._store.select(IngredientsStateSelectors.ingredients)
              )
            )
            .pipe(map((res) => ({ data: res.items, total: res.total })))
        )
      );
  }

  public override isLoading$ = this._store.select(
    IngredientsStateSelectors.ingredientsLoading
  );
}
