import { createSelector } from '@ngxs/store';
import { UnitsState } from './units.state';
import { UnitsStateModel } from './units-state-model';

export abstract class UnitsStateSelectors {
  public static units = createSelector(
    [UnitsState],
    (state: UnitsStateModel) => state.units
  );

  public static unit = createSelector(
    [UnitsState],
    (state: UnitsStateModel) => state.selectedUnit
  );
}
