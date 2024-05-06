import { createSelector } from '@ngxs/store';
import { StocksState } from './stocks.state';
import { StocksStateModel } from './stocks-state-model';

export abstract class StocksStateSelectors {
  public static stocks = createSelector(
    [StocksState],
    (state: StocksStateModel) => state.stocks
  );

  public static stocksLoading = createSelector(
    [StocksState],
    (state: StocksStateModel) => state.stocksLoading
  );

  public static stock = createSelector(
    [StocksState],
    (state: StocksStateModel) => state.selectedStock
  );

  public static stockLoading = createSelector(
    [StocksState],
    (state: StocksStateModel) => state.selectedStockLoading
  );
}
