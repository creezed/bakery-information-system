import {
  AfterViewInit,
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
  actionIsLoading,
  PageDetailActionsDirective,
  PageDetailItem,
  PageDetailsComponent,
  PageDetailTabDirective,
} from '@bakery-information-system/web/ui';
import { UnitsDetailsMainComponent } from './main/units-details-main.component';
import { TuiButtonModule, TuiLoaderModule } from '@taiga-ui/core';
import { LoadUnit } from '../state';
import { UnitDeleteCommand } from '../commands';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { filter, takeUntil, tap } from 'rxjs';
import { Store } from '@ngxs/store';
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
  providers: [
    TuiDestroyService,
    // {
    //   provide: UPDATE_COMMAND_TOKEN,
    //   useValue: {
    //     label: () => `Сохранить изменения?`,
    //     action: UpdateUnit,
    //     appearance: {
    //       label: 'Обновить',
    //       icon: 'tuiIconSave',
    //     },
    //     yesText: 'Сохранить',
    //     noText: 'Отменить',
    //   } as ConfirmOptions<UnitUpdateParams>,
    // },
    // UnitUpdateCommand,
  ],
})
export class UnitsDetailsComponent implements OnInit, AfterViewInit {
  private readonly _formBuilder = inject(FormBuilder);

  private readonly destroy$ = inject(TuiDestroyService, { self: true });

  private readonly _store = inject(Store);

  protected readonly detail =
    inject<PageDetailItem<Unit>>(POLYMORPHEUS_CONTEXT);

  // protected readonly updateCommand = inject(UnitUpdateCommand);

  protected readonly deleteCommand = inject(UnitDeleteCommand);

  protected readonly isLoading$ = actionIsLoading(LoadUnit);

  protected form!: FormGroup;

  public ngAfterViewInit(): void {
    const id = this.detail.data?.id;

    if (!id) {
      return;
    }
    this._store.dispatch(new LoadUnit({ id }));
  }

  public ngOnInit(): void {
    this.initForm();

    this._store
      .select(UnitsStateSelectors.unit)
      .pipe(
        filter(Boolean),
        tap({
          next: (res) => {
            this.form.patchValue({ common: res });
          },
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private initForm(): void {
    this.form = this._formBuilder.group({
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
  }
}
