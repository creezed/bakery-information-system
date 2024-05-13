import { createSelector } from '@ngxs/store';
import { SuppliersState } from './suppliers.state';
import { SuppliersStateModel } from './suppliers-state-model';

export abstract class SuppliersStateSelectors {
  public static suppliers = createSelector(
    [SuppliersState],
    (state: SuppliersStateModel) => state.suppliers
  );

  public static suppliersLoading = createSelector(
    [SuppliersState],
    (state: SuppliersStateModel) => state.suppliersLoading
  );

  public static supplier = createSelector(
    [SuppliersState],
    (state: SuppliersStateModel) => state.selectedSuppler
  );

  public static supplierLoading = createSelector(
    [SuppliersState],
    (state: SuppliersStateModel) => state.selectedSupplierLoading
  );
}
