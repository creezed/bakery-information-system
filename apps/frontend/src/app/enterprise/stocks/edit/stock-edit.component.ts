import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiDialogContext,
  TuiErrorModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { CreateStockModel, Stock } from '../models';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ModelToFormGroupType,
  UpdateCommand,
} from '@bakery-information-system/web/ui';
import { StocksStateSelectors } from '../state/stocks-state.selectors';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { filter, takeUntil, tap } from 'rxjs';
import { UpdateStockParamsType } from '../types';
import { LoadStock, RemoveStock, UpdateStock } from '../state';
import { TuiDestroyService, TuiLetModule } from '@taiga-ui/cdk';
import {
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiTextareaModule,
} from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/experimental';

@Component({
  selector: 'app-stock-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiTextfieldControllerModule,
    TuiInputModule,
    TuiButtonModule,
    TuiLetModule,
    TuiTextareaModule,
  ],
  templateUrl: './stock-edit.component.html',
  styleUrl: './stock-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class StockEditComponent implements OnInit {
  private readonly _store = inject(Store);

  private readonly actions$ = inject(Actions);

  private readonly _destroy$ = inject(TuiDestroyService, { self: true });

  private readonly _context =
    inject<TuiDialogContext<boolean, Stock>>(POLYMORPHEUS_CONTEXT);

  private readonly _formBuilder = inject(FormBuilder);

  protected readonly updateCommand =
    inject<UpdateCommand<UpdateStockParamsType>>(UpdateCommand);

  protected readonly isLoading$ = this._store.select(
    StocksStateSelectors.stocksLoading
  );

  protected readonly selectedStock$ = this._store
    .select(StocksStateSelectors.stock)
    .pipe(
      filter(Boolean),
      tap({
        next: (res) => {
          this.form.patchValue(res);
        },
      })
    );

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

  public ngOnInit(): void {
    this.loadStock();
    this.triggerClose();
  }

  protected updateStock(selectedStock: Stock | null): void {
    if (!this.form.valid || !selectedStock) {
      return;
    }

    this.updateCommand.execute({
      id: selectedStock.id,
      model: this.form.getRawValue(),
    });
  }

  private loadStock(): void {
    this._store.dispatch(new LoadStock({ id: this._context.data.id }));
  }

  private triggerClose(): void {
    this.actions$
      .pipe(
        ofActionSuccessful(RemoveStock, UpdateStock),
        takeUntil(this._destroy$)
      )
      .subscribe(() => {
        this._context.completeWith(true);
      });
  }

  protected close(): void {
    this._context.completeWith(false);
  }
}
