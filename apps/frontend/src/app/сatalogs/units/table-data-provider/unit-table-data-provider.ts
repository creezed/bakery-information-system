import { inject, Injectable } from '@angular/core';
import {
  AbstractTableQueryDataProvider,
  TableOutputData,
} from '@bakery-information-system/web/ui';
import { Unit } from '../models/unit.model';
import { map, switchMap } from 'rxjs';
import { Store } from '@ngxs/store';
import { LoadUnits } from '../state';
import { UnitsStateSelectors } from '../state/units-state.selectors';

@Injectable()
export class UnitTableQueryDataProvider extends AbstractTableQueryDataProvider<Unit> {
  private readonly _store = inject(Store);

  public loadData(data: TableOutputData) {
    return this._store
      .dispatch(
        new LoadUnits({
          paginated: { page: data.currentPage + 1, limit: data.itemsPerPage },
        })
      )
      .pipe(switchMap(() => this._store.select(UnitsStateSelectors.units)))
      .pipe(map((res) => ({ data: res.items, total: res.total })));
  }

  public override isLoading$ = this._store.select(
    UnitsStateSelectors.unitsLoading
  );
}
