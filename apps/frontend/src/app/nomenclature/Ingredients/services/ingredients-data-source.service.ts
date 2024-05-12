import { inject, Injectable } from '@angular/core';
import { IngredientsService } from '@bakery-information-system/web/api-client';
import {
  JsonPatchModel,
  PaginatedQueryModel,
} from '@bakery-information-system/web/shared';
import { CreateIngredientModel } from '../models';

@Injectable({ providedIn: 'root' })
export class IngredientsDataSourceService {
  private readonly _api = inject(IngredientsService);

  public getAll(paginated?: PaginatedQueryModel) {
    return this._api.ingredientsControllerGetAll(paginated);
  }

  public getOne(id: string) {
    return this._api.ingredientsControllerGetOne({ id });
  }

  public create(params: CreateIngredientModel) {
    return this._api.ingredientsControllerCreate({ body: params });
  }

  public remove(id: string) {
    return this._api.ingredientsControllerDelete({ id });
  }

  public update(id: string, patch: JsonPatchModel[]) {
    return this._api.ingredientsControllerPatch({
      id,
      body: {
        patch: patch,
      },
    });
  }
}
