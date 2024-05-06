import { Stock } from '../models';

export interface StocksStateModel {
  stocks: {
    items: Stock[];
    total: number;
  };
  stocksLoading: boolean;
  selectedStock: Stock | null;
  selectedStockLoading: boolean;
}
