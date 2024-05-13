import { inject, Injectable } from '@angular/core';
import { SuppliersService } from '@bakery-information-system/web/api-client';
import {
  JsonPatchModel,
  PaginatedQueryModel,
} from '@bakery-information-system/web/shared';
import { CreateSupplierModel } from '../models';

@Injectable({ providedIn: 'root' })
export class SupplierDataSourceService {
  private readonly _api = inject(SuppliersService);

  public getAll(paginated?: PaginatedQueryModel) {
    return this._api.suppliersControllerGetAll(paginated);
  }

  public getOne(id: string) {
    return this._api.suppliersControllerGetOne({ id });
  }

  public create(params: CreateSupplierModel) {
    return this._api.suppliersControllerCreate({ body: params });
  }

  public remove(id: string) {
    return this._api.suppliersControllerDelete({ id });
  }

  public update(id: string, patch: JsonPatchModel[]) {
    return this._api.suppliersControllerPatch({
      id,
      body: {
        patch: patch,
      },
    });
  }
}
