import { inject, Injectable } from '@angular/core';
import { StocksService } from '@bakery-information-system/web/api-client';
import {
  JsonPatchModel,
  PaginatedQueryModel,
} from '@bakery-information-system/web/shared';
import { CreateStockModel } from '../models';

@Injectable({ providedIn: 'root' })
export class StocksDataSourceService {
  private readonly _api = inject(StocksService);

  public getAll(paginated?: PaginatedQueryModel) {
    return this._api.stocksControllerGetAll(paginated);
  }

  public getOne(id: string) {
    return this._api.stocksControllerGetOne({ id });
  }

  public create(params: CreateStockModel) {
    return this._api.stocksControllerCreate({ body: params });
  }

  public remove(id: string) {
    return this._api.stocksControllerDelete({ id });
  }

  public update(id: string, patch: JsonPatchModel[]) {
    return this._api.stocksControllerPatch({
      id,
      body: {
        patch: patch,
      },
    });
  }
}
