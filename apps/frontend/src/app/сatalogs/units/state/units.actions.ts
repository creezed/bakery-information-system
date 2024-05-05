import { CreateUnitModel } from '../models/create-unit.model';
import { UnitUpdateParams } from '../commands';

export class LoadUnits {
  public static type = '[UNITS] load units';
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
  constructor(public payload: UnitUpdateParams) {}
}

export class RemoveUnit {
  public static type = '[UNITS] remove unit';
  constructor(public payload: { id: string }) {}
}
