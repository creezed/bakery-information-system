import { Action, State, StateContext } from '@ngxs/store';
import { append, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { inject, Injectable } from '@angular/core';
import { StocksStateModel } from './stocks-state-model';
import { StocksDataSourceService } from '../services';
import {
  CreateStock,
  LoadStock,
  LoadStocks,
  RemoveStock,
  UpdateStock,
} from './stocks.actions';
import { tap } from 'rxjs';
import { JsonPatchModel } from '@bakery-information-system/web/shared';
import { compare } from 'fast-json-patch';
import { UpdateStockModel } from '../models/update-stock.model';

@State<StocksStateModel>({
  name: 'stocks',
  defaults: {
    stocks: {
      items: [],
      total: 0,
    },
    stocksLoading: false,
    selectedStock: null,
    selectedStockLoading: false,
  },
})
@Injectable()
export class StocksState {
  private readonly _dataSourceService = inject(StocksDataSourceService);

  @Action(LoadStocks)
  public loadStocks(
    ctx: StateContext<StocksStateModel>,
    { payload }: LoadStocks
  ) {
    const paginated = payload?.paginated;

    ctx.patchState({
      stocksLoading: true,
    });

    return this._dataSourceService.getAll(paginated).pipe(
      tap((res) =>
        ctx.patchState({
          stocks: {
            items: res.data,
            total: res.meta.totalItems,
          },
          stocksLoading: false,
        })
      )
    );
  }

  @Action(CreateStock)
  public createStock(
    ctx: StateContext<StocksStateModel>,
    { payload }: CreateStock
  ) {
    const state = ctx.getState();

    return this._dataSourceService.create(payload.model).pipe(
      tap({
        next: (res) =>
          ctx.setState(
            patch({
              stocks: patch({
                items: append([res]),
                total: state.stocks.total + 1,
              }),
            })
          ),
      })
    );
  }

  @Action(LoadStock)
  public loadStock(
    ctx: StateContext<StocksStateModel>,
    { payload: { id } }: LoadStock
  ) {
    ctx.patchState({ selectedStockLoading: true });

    return this._dataSourceService
      .getOne(id)
      .pipe(
        tap((stock) =>
          ctx.patchState({ selectedStock: stock, selectedStockLoading: false })
        )
      );
  }

  @Action(RemoveStock)
  public removeStock(
    ctx: StateContext<StocksStateModel>,
    { payload: { id } }: RemoveStock
  ) {
    const state = ctx.getState();

    return this._dataSourceService.remove(id).pipe(
      tap({
        next: () =>
          ctx.setState(
            patch({
              stocks: patch({
                items: removeItem((stock) => stock.id === id),
                total: state.stocks.total - 1,
              }),
            })
          ),
      })
    );
  }

  @Action(UpdateStock)
  public updateStock(
    ctx: StateContext<StocksStateModel>,
    { payload: { id, model } }: UpdateStock
  ) {
    const { selectedStock } = ctx.getState();

    if (!selectedStock) {
      return;
    }

    const updateModel: UpdateStockModel = {
      code: selectedStock.code,
      description: selectedStock.description,
      name: selectedStock.name,
    };

    const patchOperations: JsonPatchModel[] = compare(
      updateModel,
      model
    ) as JsonPatchModel[];

    return this._dataSourceService.update(id, patchOperations).pipe(
      tap({
        next: (res) =>
          ctx.setState(
            patch({
              stocks: patch({
                items: updateItem((stock) => stock.id === res.id, res),
              }),
              selectedStock: res,
            })
          ),
      })
    );
  }
}
