import { inject, Injectable } from '@angular/core';
import {
  AbstractTableQueryDataProvider,
  TableOutputData,
} from '@bakery-information-system/web/ui';
import { map, switchMap } from 'rxjs';
import { Store } from '@ngxs/store';
import { Stock } from '../models';
import { LoadStocks } from '../state';
import { StocksStateSelectors } from '../state/stocks-state.selectors';

@Injectable()
export class StockTableQueryDataProvider extends AbstractTableQueryDataProvider<Stock> {
  private readonly _store = inject(Store);

  public loadData(data: TableOutputData) {
    return this._store
      .dispatch(
        new LoadStocks({
          paginated: { page: data.currentPage + 1, limit: data.itemsPerPage },
        })
      )
      .pipe(switchMap(() => this._store.select(StocksStateSelectors.stocks)))
      .pipe(map((res) => ({ data: res.items, total: res.total })));
  }

  public override isLoading$ = this._store.select(
    StocksStateSelectors.stocksLoading
  );
}
