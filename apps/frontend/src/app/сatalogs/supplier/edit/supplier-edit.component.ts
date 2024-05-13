import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SUPPLIER_EDIT_PROVIDERS,
  SUPPLIER_INFO,
} from './supplier-edit.providers';
import {
  AbstractForm,
  actionIsLoading,
  InputComponent,
  ModelToFormGroupType,
  PhoneComponent,
} from '@bakery-information-system/web/ui';
import { Supplier, UpdateSupplierModel } from '../models';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  TuiDialogContext,
  TuiLoaderModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { Store } from '@ngxs/store';
import { CreateSupplier, UpdateSupplier } from '../state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { TuiButtonModule } from '@taiga-ui/experimental';
import { TuiLetModule } from '@taiga-ui/cdk';
import { SuppliersStateSelectors } from '../state/suppliers-state.selectors';

@Component({
  selector: 'app-supplier-edit',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    PhoneComponent,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiTextfieldControllerModule,
    TuiLetModule,
    TuiLoaderModule,
  ],
  templateUrl: './supplier-edit.component.html',
  styleUrl: './supplier-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: SUPPLIER_EDIT_PROVIDERS,
})
export class SupplierEditComponent extends AbstractForm<
  UpdateSupplierModel,
  UpdateSupplierModel
> {
  private readonly _context =
    inject<TuiDialogContext<boolean, Supplier>>(POLYMORPHEUS_CONTEXT);

  private readonly supplier = this._context.data;

  private readonly _fb = inject(FormBuilder);

  private readonly _store = inject(Store);

  private readonly _destroyRef = inject(DestroyRef);

  protected readonly isLoading$ = actionIsLoading(CreateSupplier);

  protected override form: FormGroup<
    ModelToFormGroupType<UpdateSupplierModel>
  > = this._fb.group({
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

  protected readonly selectedSupplier$ = inject(SUPPLIER_INFO).pipe(
    tap({
      next: (res) => {
        this.form.patchValue(res, { onlySelf: true, emitEvent: false });
      },
    })
  );

  protected readonly selectedSupplierLoading$ = this._store.select(
    SuppliersStateSelectors.suppliersLoading
  );

  protected override mapFormValueToModel = (): UpdateSupplierModel => {
    return this.form.getRawValue();
  };

  protected override submitHandler = (model: UpdateSupplierModel) => {
    this._store
      .dispatch(new UpdateSupplier({ model: model, id: this.supplier.id }))
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
