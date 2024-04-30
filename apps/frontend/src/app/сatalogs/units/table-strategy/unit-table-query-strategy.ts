import { inject, Injectable } from '@angular/core';
import { AbstractTableQueryStrategy } from '@bakery-information-system/ui';
import { Unit } from '../models/unit.model';
import { UnitsDatasourceService } from '../services';
import { map } from 'rxjs';

@Injectable()
export class UnitTableQueryStrategy extends AbstractTableQueryStrategy<Unit> {
  private readonly _dataSource = inject(UnitsDatasourceService);

  public loadData() {
    return this._dataSource
      .getAll()
      .pipe(map((res) => ({ data: res.data, total: res.meta.totalItems })));
  }
}
