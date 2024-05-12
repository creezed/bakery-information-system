import { DestroyRef, inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IngredientsValidators } from '../validators/ingredients-validators';
import {
  Unit,
  UnitsConversionService,
  UnitsDataSourceService,
} from '../../../сatalogs/units';
import {
  ComboboxInfinityScrollDataProvider,
  ModelToFormGroupType,
} from '@bakery-information-system/web/ui';
import { PaginatedBuilder } from '../../../shared';
import { filter, map } from 'rxjs';
import { AddEditFormModelType } from '../types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class IngredientsFormsService {
  private readonly _fb = inject(FormBuilder);
  private readonly _validators = inject(IngredientsValidators);
  private readonly _unitsDataSource = inject(UnitsDataSourceService);
  private readonly _unitsConversionService = inject(UnitsConversionService);
  private readonly _destroyRef = inject(DestroyRef);

  public addEditForm = this._fb.group<
    ModelToFormGroupType<AddEditFormModelType>
  >({
    article: this._fb.control('', {
      validators: [Validators.required],
      asyncValidators: [this._validators.checkUniqueArticle()],
      nonNullable: true,
    }),
    name: this._fb.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    unit: this._fb.control<Unit | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    weightKg: this._fb.control(1, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public constructor() {
    this.addEditForm
      .get('unit')
      ?.valueChanges.pipe(filter(Boolean), takeUntilDestroyed(this._destroyRef))
      .subscribe((unit) => {
        this.handleUnitChange(unit);
      });
  }

  public unitsComboboxStringify = (unit: Unit) => unit.fullName;

  public unitsComboboxDataProvider: ComboboxInfinityScrollDataProvider<Unit> = (
    search: string,
    page: number
  ) => {
    const paginated = new PaginatedBuilder()
      .setPage(page)
      .setSearch('fullName', search)
      .build();

    return this._unitsDataSource.getAll(paginated).pipe(
      map(({ data, meta: { totalPages } }) => ({
        items: data,
        hasMorePages: totalPages > page,
      }))
    );
  };

  public handleUnitChange = (unit: Unit): void => {
    const basicWeightKg = this._unitsConversionService.convertToKg(unit.name);

    if (basicWeightKg) {
      this.addEditForm.controls.weightKg.setValue(basicWeightKg);
      this.addEditForm.controls.weightKg.disable({ onlySelf: true });
    } else if (this.addEditForm.controls.weightKg.disabled) {
      this.addEditForm.controls.weightKg.enable({ onlySelf: true });
    }
  };
}
