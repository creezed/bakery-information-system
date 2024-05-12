import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiDialogContext,
  TuiErrorModule,
  TuiLoaderModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import {
  AbstractForm,
  actionIsLoading,
  ComboboxComponent,
  ComboboxDataProviderDirective,
  ComboboxInfinityScrollDataProviderDirective,
  ComboboxWithAddButtonDirective,
  englishAlphanumericMask,
  InputComponent,
  InputNumberComponent,
} from '@bakery-information-system/web/ui';
import { CreateIngredient } from '../state';
import { TuiButtonModule } from '@taiga-ui/experimental';
import {
  TUI_VALIDATION_ERRORS,
  TuiFieldErrorPipeModule,
  TuiInputModule,
} from '@taiga-ui/kit';
import { CreateIngredientModel } from '../models';
import { IngredientsFormsService } from '../services';
import { AddEditFormModelType } from '../types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaskitoModule } from '@maskito/angular';

@Component({
  selector: 'app-ingredient-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiTextfieldControllerModule,
    TuiInputModule,
    TuiSvgModule,
    TuiLoaderModule,
    ComboboxComponent,
    ComboboxInfinityScrollDataProviderDirective,
    ComboboxDataProviderDirective,
    ComboboxWithAddButtonDirective,
    InputComponent,
    InputNumberComponent,
    MaskitoModule,
  ],
  templateUrl: './ingredient-create.component.html',
  styleUrl: './ingredient-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Обязательное поле',
        articleInvalid: 'Артикул ингредиента уже используется в системе',
      },
    },
    IngredientsFormsService,
  ],
})
export class IngredientCreateComponent extends AbstractForm<
  AddEditFormModelType,
  CreateIngredientModel
> {
  private readonly _context =
    inject<TuiDialogContext<boolean>>(POLYMORPHEUS_CONTEXT);

  private readonly _store = inject(Store);

  private readonly _destroyRef = inject(DestroyRef);

  protected readonly formService = inject(IngredientsFormsService);

  protected readonly isLoading$ = actionIsLoading(CreateIngredient);

  protected readonly englishAlphanumericMask = englishAlphanumericMask;

  protected override readonly form = this.formService.addEditForm;

  protected override mapFormValueToModel = (): CreateIngredientModel | null => {
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

  protected override submitHandler = (model: CreateIngredientModel): void => {
    this._store
      .dispatch(new CreateIngredient({ model: model }))
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
