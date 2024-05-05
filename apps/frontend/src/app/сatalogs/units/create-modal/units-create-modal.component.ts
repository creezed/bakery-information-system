import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiDialogContext,
  TuiErrorModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TUI_VALIDATION_ERRORS,
  TuiFieldErrorPipeModule,
  TuiInputModule,
} from '@taiga-ui/kit';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { Store } from '@ngxs/store';
import { CreateUnit } from '../state';
import {
  actionIsLoading,
  ModelToFormGroupType,
} from '@bakery-information-system/web/ui';
import { CreateUnitModel } from '../models/create-unit.model';
import { takeUntil } from 'rxjs';
import { TuiButtonModule } from '@taiga-ui/experimental';
import { TuiDestroyService } from '@taiga-ui/cdk';

@Component({
  selector: 'app-units-create-modal',
  standalone: true,
  imports: [
    CommonModule,
    TuiInputModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiButtonModule,
  ],
  templateUrl: './units-create-modal.component.html',
  styleUrl: './units-create-modal.component.scss',
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
export class UnitsCreateModalComponent {
  private readonly _context =
    inject<TuiDialogContext<boolean>>(POLYMORPHEUS_CONTEXT);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _store = inject(Store);
  private readonly _destroy$ = inject(TuiDestroyService, { self: true });

  protected isLoading$ = actionIsLoading(CreateUnit);

  protected form = this._formBuilder.group<
    ModelToFormGroupType<CreateUnitModel>
  >({
    code: this._formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    name: this._formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    fullName: this._formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  protected get formValid(): boolean {
    return this.form.valid;
  }

  protected submit(): void {
    if (!this.formValid) {
      return;
    }

    const { code, name, fullName } = this.form.value;

    if (code && name && fullName) {
      this._store
        .dispatch(new CreateUnit({ model: { code, name, fullName } }))
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => {
          this._context.completeWith(true);
        });
    }
  }

  protected close(): void {
    this._context.completeWith(false);
  }
}
