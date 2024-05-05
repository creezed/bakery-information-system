import { Unit } from '../models/unit.model';

export interface UnitsStateModel {
  units: {
    items: Unit[];
    total: number;
  };
  unitsLoading: boolean;
  selectedUnit: Unit | null;
  selectedUnitLoading: boolean;
}
