import { inject, Injectable } from '@angular/core';
import { UnitsService } from '@bakery-information-system/web/api-client';
import { CreateUnitModel } from '../models/create-unit.model';
import { delay } from 'rxjs';
import { JsonPatchModel } from '@bakery-information-system/web/shared';

@Injectable({ providedIn: 'root' })
export class UnitsDataSourceService {
  private readonly _api = inject(UnitsService);

  public getAll() {
    return this._api.unitsControllerGetAll().pipe(delay(1000));
  }

  public getOne(id: string) {
    return this._api.unitsControllerGetOne({ id }).pipe(delay(1000));
  }

  public create(params: CreateUnitModel) {
    return this._api.unitsControllerCreate({ body: params }).pipe(delay(1000));
  }

  public remove(id: string) {
    return this._api.unitsControllerDelete({ id }).pipe(delay(1000));
  }

  public update(id: string, patch: JsonPatchModel[]) {
    return this._api.unitsControllerPatch({
      id,
      body: {
        patch: patch,
      },
    });
  }
}
