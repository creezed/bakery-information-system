import { CreateUnitModel } from '../models/create-unit.model';
import { UpdateUnitModel } from '../models/update-unit.model';
import { PaginatedQueryModel } from '@bakery-information-system/web/shared';

export class LoadUnits {
  public static type = '[UNITS] load units';

  public constructor(public payload?: { paginated?: PaginatedQueryModel }) {}
}

export class LoadUnit {
  public static type = '[UNITS] load unit';

  constructor(public payload: { id: string }) {}
}

export class CreateUnit {
  public static type = '[UNITS] create unit';
  constructor(public payload: { model: CreateUnitModel }) {}
}

export class UpdateUnit {
  public static type = '[UNITS] update unit';
  constructor(public payload: { id: string; model: UpdateUnitModel }) {}
}

export class RemoveUnit {
  public static type = '[UNITS] remove unit';
  constructor(public payload: { id: string }) {}
}
