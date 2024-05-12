import { Unit } from '../../../сatalogs/units';

export interface IngredientDetailModel {
  readonly article: string;
  readonly id: string;
  readonly name: string;
  readonly unit: Unit;
  readonly weightKg: number;
}
