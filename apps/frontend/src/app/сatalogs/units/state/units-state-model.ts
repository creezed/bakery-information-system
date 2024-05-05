import { Unit } from '../models/unit.model';

export interface UnitsStateModel {
  units: Unit[];
  selectedUnit: Unit | null;
}
