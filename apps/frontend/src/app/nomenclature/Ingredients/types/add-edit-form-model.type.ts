import { Unit } from '../../../сatalogs/units';

export interface AddEditFormModelType {
  readonly article: string;
  readonly name: string;
  readonly unit: Unit | null;
  readonly weightKg: number;
}
