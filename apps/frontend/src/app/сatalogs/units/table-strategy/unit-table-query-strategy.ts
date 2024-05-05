import { inject, Injectable } from '@angular/core';
import { AbstractTableQueryStrategy } from '@bakery-information-system/web/ui';
import { Unit } from '../models/unit.model';
import { UnitsDataSourceService } from '../services';
import { map, switchMap } from 'rxjs';
import { Store } from '@ngxs/store';
import { LoadUnits } from '../state';
import { UnitsStateSelectors } from '../state/units-state.selectors';

@Injectable()
export class UnitTableQueryStrategy extends AbstractTableQueryStrategy<Unit> {
  private readonly _dataSource = inject(UnitsDataSourceService);
  private readonly _store = inject(Store);

  public loadData() {
    return this._store
      .dispatch(new LoadUnits())
      .pipe(switchMap(() => this._store.select(UnitsStateSelectors.units)))
      .pipe(map((res) => ({ data: res, total: res.length })));
  }
}
