import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TUI_VALIDATION_ERRORS,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiTextareaModule,
} from '@taiga-ui/kit';
import { TuiDestroyService } from '@taiga-ui/cdk';
import {
  TuiDialogContext,
  TuiErrorModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import {
  actionIsLoading,
  ModelToFormGroupType,
} from '@bakery-information-system/web/ui';
import { takeUntil } from 'rxjs';
import { CreateStock } from '../state';
import { CreateStockModel } from '../models';
import { TuiButtonModule } from '@taiga-ui/experimental';

@Component({
  selector: 'app-stock-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiTextfieldControllerModule,
    TuiInputModule,
    TuiTextareaModule,
  ],
  templateUrl: './stock-create.component.html',
  styleUrl: './stock-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Обязательное поле',
      },
    },
    TuiDestroyService,
  ],
})
export class StockCreateComponent {
  private readonly _context =
    inject<TuiDialogContext<boolean>>(POLYMORPHEUS_CONTEXT);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _store = inject(Store);
  private readonly _destroy$ = inject(TuiDestroyService, { self: true });

  protected isLoading$ = actionIsLoading(CreateStock);

  protected form = this._formBuilder.group<
    ModelToFormGroupType<CreateStockModel>
  >({
    code: this._formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    name: this._formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    description: this._formBuilder.control('', {
      nonNullable: true,
      validators: [Validators.maxLength(400)],
    }),
  });

  protected get formValid(): boolean {
    return this.form.valid;
  }

  protected submit(): void {
    if (!this.formValid) {
      return;
    }

    this._store
      .dispatch(new CreateStock({ model: this.form.getRawValue() }))
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this._context.completeWith(true);
      });
  }

  protected close(): void {
    this._context.completeWith(false);
  }
}
