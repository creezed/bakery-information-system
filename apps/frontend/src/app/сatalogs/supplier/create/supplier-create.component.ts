import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { TuiDialogContext, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import {
  AbstractForm,
  actionIsLoading,
  ComboboxComponent,
  ComboboxInfinityScrollDataProviderDirective,
  InputComponent,
  ModelToFormGroupType,
  PhoneComponent,
} from '@bakery-information-system/web/ui';
import { CreateSupplierModel } from '../models';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngxs/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateSupplier } from '../state';
import { TuiButtonModule } from '@taiga-ui/experimental';

@Component({
  selector: 'app-supplier-create',
  standalone: true,
  imports: [
    CommonModule,
    ComboboxComponent,
    ComboboxInfinityScrollDataProviderDirective,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    InputComponent,
    TuiButtonModule,
    TuiButtonModule,
    PhoneComponent,
  ],
  templateUrl: './supplier-create.component.html',
  styleUrl: './supplier-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Обязательное поле',
        email: 'Неверный формат почты',
      },
    },
  ],
})
export class SupplierCreateComponent extends AbstractForm<
  CreateSupplierModel,
  CreateSupplierModel
> {
  private readonly _context =
    inject<TuiDialogContext<boolean>>(POLYMORPHEUS_CONTEXT);

  private readonly _fb = inject(FormBuilder);
  private readonly _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);
  protected readonly isLoading$ = actionIsLoading(CreateSupplier);

  protected form: FormGroup<ModelToFormGroupType<CreateSupplierModel>> =
    this._fb.group({
      email: this._fb.control('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      name: this._fb.control('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      phone: this._fb.control('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });

  protected mapFormValueToModel = (): CreateSupplierModel => {
    return this.form.getRawValue();
  };

  protected submitHandler = (model: CreateSupplierModel): void => {
    this._store
      .dispatch(new CreateSupplier({ model: model }))
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
