import { Action, State, StateContext } from '@ngxs/store';
import { append, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { inject, Injectable } from '@angular/core';
import { IngredientsStateModel } from './ingredients-state-model';
import { concatMap, map, Observable, tap } from 'rxjs';
import { JsonPatchModel } from '@bakery-information-system/web/shared';
import { compare } from 'fast-json-patch';
import {
  CreateIngredient,
  LoadIngredient,
  LoadIngredients,
  RemoveIngredient,
  UpdateIngredient,
} from './ingredients.actions';
import { IngredientsDataSourceService } from '../services';
import { IngredientDetailModel, UpdateIngredientModel } from '../models';
import { UnitsDataSourceService } from '../../../сatalogs/units';

@State<IngredientsStateModel>({
  name: 'ingredients',
  defaults: {
    ingredients: {
      items: [],
      total: 0,
    },
    ingredientsLoading: false,
    selectedIngredient: null,
    selectedIngredientLoading: false,
  },
})
@Injectable()
export class IngredientsState {
  private readonly _dataSourceService = inject(IngredientsDataSourceService);
  private readonly _unitsDataSourceService = inject(UnitsDataSourceService);

  @Action(LoadIngredients)
  public loadIngredients(
    ctx: StateContext<IngredientsStateModel>,
    { payload }: LoadIngredients
  ) {
    const paginated = payload?.paginated;

    ctx.patchState({
      ingredientsLoading: true,
    });

    return this._dataSourceService.getAll(paginated).pipe(
      tap((res) =>
        ctx.patchState({
          ingredients: {
            items: res.data,
            total: res.meta.totalItems,
          },
          ingredientsLoading: false,
        })
      )
    );
  }

  @Action(CreateIngredient)
  public createIngredient(
    ctx: StateContext<IngredientsStateModel>,
    { payload }: CreateIngredient
  ) {
    const state = ctx.getState();

    return this._dataSourceService.create(payload.model).pipe(
      tap({
        next: (res) =>
          ctx.setState(
            patch({
              ingredients: patch({
                items: append([res]),
                total: state.ingredients.total + 1,
              }),
            })
          ),
      })
    );
  }

  @Action(LoadIngredient)
  public loadIngredient(
    ctx: StateContext<IngredientsStateModel>,
    { payload: { id } }: LoadIngredient
  ): Observable<IngredientDetailModel> {
    ctx.patchState({ selectedIngredientLoading: true });

    return this._dataSourceService.getOne(id).pipe(
      concatMap((response) =>
        this._unitsDataSourceService.getOne(response.unitId).pipe(
          map((unit) => ({
            article: response.article,
            id: response.id,
            name: response.name,
            unit: unit,
            weightKg: response.weightKg,
          }))
        )
      ),
      tap((detail) => {
        ctx.patchState({
          selectedIngredient: detail,
          selectedIngredientLoading: false,
        });
      })
    );
  }

  @Action(RemoveIngredient)
  public removeIngredient(
    ctx: StateContext<IngredientsStateModel>,
    { payload: { id } }: RemoveIngredient
  ) {
    const state = ctx.getState();

    return this._dataSourceService.remove(id).pipe(
      tap({
        next: () =>
          ctx.setState(
            patch({
              ingredients: patch({
                items: removeItem((ingredient) => ingredient.id === id),
                total: state.ingredients.total - 1,
              }),
            })
          ),
      })
    );
  }

  @Action(UpdateIngredient)
  public updateIngredient(
    ctx: StateContext<IngredientsStateModel>,
    { payload: { id, model } }: UpdateIngredient
  ) {
    const { selectedIngredient } = ctx.getState();

    if (!selectedIngredient) {
      return;
    }

    const updateModel: UpdateIngredientModel = {
      article: selectedIngredient.article,
      name: selectedIngredient.name,
      unitId: selectedIngredient.unit.id,
      weightKg: selectedIngredient.weightKg,
    };

    const patchOperations: JsonPatchModel[] = compare(
      updateModel,
      model
    ) as JsonPatchModel[];

    return this._dataSourceService.update(id, patchOperations).pipe(
      tap({
        next: (res) =>
          ctx.setState(
            patch({
              ingredients: patch({
                items: updateItem(
                  (ingredient) => ingredient.id === res.id,
                  res
                ),
              }),
            })
          ),
      })
    );
  }
}
