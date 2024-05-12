import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import {
  TuiDialogContext,
  TuiLoaderModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { Ingredient, UpdateIngredientModel } from '../models';
import { Store } from '@ngxs/store';
import {
  AbstractForm,
  actionIsLoading,
  ComboboxComponent,
  ComboboxInfinityScrollDataProviderDirective,
  englishAlphanumericMask,
  InputComponent,
  InputNumberComponent,
} from '@bakery-information-system/web/ui';
import { AddEditFormModelType } from '../types';
import { IngredientsFormsService } from '../services';
import { CreateIngredient, UpdateIngredient } from '../state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule } from '@taiga-ui/experimental';
import { AsyncPipe } from '@angular/common';
import { tap } from 'rxjs';
import { TuiLetModule } from '@taiga-ui/cdk';
import { MaskitoModule } from '@maskito/angular';
import {
  INGREDIENT_EDIT_PROVIDERS,
  INGREDIENT_INFO,
} from './ingredient-edit.providers';
import { IngredientsStateSelectors } from '../state/ingredients-state.selectors';

@Component({
  selector: 'app-ingredient-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    InputComponent,
    ComboboxInfinityScrollDataProviderDirective,
    ComboboxComponent,
    InputNumberComponent,
    TuiButtonModule,
    TuiButtonModule,
    AsyncPipe,
    TuiLetModule,
    MaskitoModule,
    TuiLoaderModule,
  ],
  templateUrl: './ingredient-edit.component.html',
  styleUrl: './ingredient-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: INGREDIENT_EDIT_PROVIDERS,
})
export class IngredientEditComponent extends AbstractForm<
  AddEditFormModelType,
  UpdateIngredientModel
> {
  private readonly _context =
    inject<TuiDialogContext<boolean, Ingredient>>(POLYMORPHEUS_CONTEXT);

  private readonly ingredient = this._context.data;

  private readonly _store = inject(Store);

  private readonly _destroyRef = inject(DestroyRef);

  protected readonly formService = inject(IngredientsFormsService);

  protected readonly englishAlphanumericMask = englishAlphanumericMask;

  protected readonly isLoading$ = actionIsLoading(CreateIngredient);

  protected override readonly form = this.formService.addEditForm;

  protected readonly selectedIngredient$ = inject(INGREDIENT_INFO).pipe(
    tap({
      next: (res) => {
        this.form.patchValue(res, { onlySelf: true, emitEvent: false });
      },
    })
  );

  protected readonly selectedIngredientLoading$ = this._store.select(
    IngredientsStateSelectors.ingredientLoading
  );

  protected override mapFormValueToModel = (): UpdateIngredientModel | null => {
    const { article, name, unit, weightKg } = this.form.getRawValue();

    if (!unit) {
      return null;
    }

    return {
      unitId: unit.id,
      article,
      name,
      weightKg,
    };
  };

  protected override submitHandler = (model: UpdateIngredientModel): void => {
    this._store
      .dispatch(new UpdateIngredient({ model: model, id: this.ingredient.id }))
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          this._context.completeWith(true);
        },
      });
  };

  protected close(): void {
    this._context.completeWith(false);
  }
}
