import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDestroyService, TuiLetModule } from '@taiga-ui/cdk';
import { Unit } from '../models/unit.model';
import {
  DeleteCommand,
  PageDetailActionsDirective,
  PageDetailItem,
  PageDetailsComponent,
  PageDetailTabDirective,
  UpdateCommand,
} from '@bakery-information-system/web/ui';
import { UnitsDetailsMainComponent } from './main/units-details-main.component';
import { TuiButtonModule, TuiLoaderModule } from '@taiga-ui/core';
import { LoadUnit, RemoveUnit, UpdateUnit } from '../state';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { filter, takeUntil, tap } from 'rxjs';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { UnitsStateSelectors } from '../state/units-state.selectors';

@Component({
  selector: 'app-units-details',
  standalone: true,
  imports: [
    CommonModule,
    PageDetailTabDirective,
    PageDetailsComponent,
    UnitsDetailsMainComponent,
    TuiLoaderModule,
    TuiButtonModule,
    TuiLetModule,
    PageDetailActionsDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './units-details.component.html',
  styleUrl: './units-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class UnitsDetailsComponent implements OnInit, OnInit {
  private readonly _formBuilder = inject(FormBuilder);

  private readonly _store = inject(Store);

  private readonly _destroy$ = inject(TuiDestroyService, { self: true });

  protected readonly detail =
    inject<PageDetailItem<Unit>>(POLYMORPHEUS_CONTEXT);

  protected readonly updateCommand = inject(UpdateCommand);

  protected readonly deleteCommand = inject(DeleteCommand);

  protected readonly isLoading$ = this._store.select(
    UnitsStateSelectors.unitLoading
  );

  private readonly actions$ = inject(Actions);

  protected readonly selectedUnit$ = this._store
    .select(UnitsStateSelectors.unit)
    .pipe(
      filter(Boolean),
      tap({
        next: (res) => {
          this.form.patchValue({ common: res });
        },
      })
    );

  protected form = this._formBuilder.group({
    common: this._formBuilder.group({
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
    }),
  });

  public ngOnInit(): void {
    this.loadUnit();
    this.triggerClose();
  }

  protected updateUnit(selectedUnit: Unit): void {
    if (!this.form.valid) {
      return;
    }

    this.updateCommand.execute({
      id: selectedUnit.id,
      model: this.form.getRawValue().common,
    });
  }

  protected deleteUnit(selectedUnit: Unit): void {
    this.deleteCommand.execute(selectedUnit);
  }

  private loadUnit(): void {
    const id = this.detail.data?.id;

    if (!id) {
      return;
    }
    this._store.dispatch(new LoadUnit({ id }));
  }

  private triggerClose(): void {
    this.actions$
      .pipe(
        ofActionSuccessful(RemoveUnit, UpdateUnit),
        takeUntil(this._destroy$)
      )
      .subscribe((res) => {
        if (res.payload.id === this.detail.data?.id) {
          this.detail.completeWith(true);
        }
      });
  }
}
