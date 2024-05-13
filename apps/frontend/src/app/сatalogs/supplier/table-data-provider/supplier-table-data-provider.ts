import { inject, Injectable } from '@angular/core';
import {
  AbstractTableQueryDataProvider,
  TableOutputData,
} from '@bakery-information-system/web/ui';
import { map, switchMap } from 'rxjs';
import { Store } from '@ngxs/store';
import { SuppliersStateSelectors } from '../state/suppliers-state.selectors';
import { LoadSuppliers } from '../state';
import { Supplier } from '../models';

@Injectable()
export class SupplierTableDataProvider extends AbstractTableQueryDataProvider<Supplier> {
  private readonly _store = inject(Store);

  public loadData(data: TableOutputData) {
    return this._store
      .dispatch(
        new LoadSuppliers({
          paginated: { page: data.currentPage + 1, limit: data.itemsPerPage },
        })
      )
      .pipe(
        switchMap(() => this._store.select(SuppliersStateSelectors.suppliers))
      )
      .pipe(map((res) => ({ data: res.items, total: res.total })));
  }

  public override isLoading$ = this._store.select(
    SuppliersStateSelectors.suppliersLoading
  );
}
