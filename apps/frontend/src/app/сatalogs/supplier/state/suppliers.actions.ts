import { PaginatedQueryModel } from '@bakery-information-system/web/shared';
import { CreateSupplierModel, UpdateSupplierModel } from '../models';

export class LoadSuppliers {
  public static type = '[SUPPLIERS] load  suppliers';

  public constructor(public payload?: { paginated?: PaginatedQueryModel }) {}
}

export class LoadSupplier {
  public static type = '[SUPPLIERS] load supplier';

  constructor(public payload: { id: string }) {}
}

export class CreateSupplier {
  public static type = '[SUPPLIERS] create supplier';
  constructor(public payload: { model: CreateSupplierModel }) {}
}

export class UpdateSupplier {
  public static type = '[SUPPLIERS] update supplier';
  constructor(public payload: { id: string; model: UpdateSupplierModel }) {}
}

export class RemoveSupplier {
  public static type = '[SUPPLIERS] remove supplier';
  constructor(public payload: { id: string }) {}
}
