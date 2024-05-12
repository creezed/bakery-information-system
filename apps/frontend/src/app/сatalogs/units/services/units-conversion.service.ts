import { Injectable } from '@angular/core';
import { unitsOfMass } from '../consts';

@Injectable({ providedIn: 'root' })
export class UnitsConversionService {
  public convertToKg(unitName: string): number | null {
    const findUnit = unitsOfMass[unitName];

    if (!findUnit) {
      return null;
    }

    return findUnit.weightKg ?? null;
  }

  public convertFromKg(valueInKg: number, unitName: string): number | null {
    const findUnit = unitsOfMass[unitName];

    if (!findUnit) {
      return null;
    }

    if (!findUnit.weightKg) {
      return null;
    }

    return valueInKg / findUnit.weightKg;
  }
}
