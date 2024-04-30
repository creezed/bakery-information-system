import { inject, Injectable } from '@angular/core';
import { UnitsService } from '@bakery-information-system/api-client';
import { CreateUnitModel } from '../models/create-unit.model';
import { delay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UnitsDatasourceService {
  private readonly _api = inject(UnitsService);

  public getAll() {
    return this._api.unitsControllerGetAll().pipe(delay(1000));
  }

  public create(params: CreateUnitModel) {
    return this._api.unitsControllerCreate({ body: params });
  }
}
