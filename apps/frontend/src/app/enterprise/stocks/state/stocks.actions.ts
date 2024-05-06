import { PaginatedQueryModel } from '@bakery-information-system/web/shared';
import { CreateStockModel } from '../models';
import { UpdateStockParamsType } from '../types';

export class LoadStocks {
  public static type = '[STOCKS] load stocks';

  public constructor(public payload?: { paginated?: PaginatedQueryModel }) {}
}

export class LoadStock {
  public static type = '[STOCKS] load stock';

  constructor(public payload: { id: string }) {}
}

export class CreateStock {
  public static type = '[STOCKS] create stock';
  constructor(public payload: { model: CreateStockModel }) {}
}

export class UpdateStock {
  public static type = '[STOCKS] update stock';
  constructor(public payload: UpdateStockParamsType) {}
}

export class RemoveStock {
  public static type = '[STOCKS] remove stock';
  constructor(public payload: { id: string }) {}
}
