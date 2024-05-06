import {
  ChangeDetectionStrategy,
  Component,
  inject,
  TrackByFunction,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ColumnModel,
  DeleteCommand,
  EmptyGuardComponent,
  PageActionsDirective,
  PageComponent,
  PageTabDirective,
  provideDeleteCommand,
  provideEmptyGuardOptions,
  provideTableQuery,
  provideToCreateCommand,
  provideToEditCommand,
  provideUpdateCommand,
  TableComponent,
  ToCreateCommand,
  ToEditCommand,
} from '@bakery-information-system/web/ui';
import { TuiContextWithImplicit, TuiLetModule } from '@taiga-ui/cdk';
import { TuiButtonModule } from '@taiga-ui/core';
import { Unit } from './models/unit.model';
import { UnitTableQueryDataProvider } from './table-data-provider';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import { RouterOutlet } from '@angular/router';
import { RemoveUnit, UpdateUnit } from './state';
import { UnitsCreateModalComponent } from './create-modal/units-create-modal.component';
import { UnitsDetailsComponent } from './details/units-details.component';
import { TuiSelectModule } from '@taiga-ui/kit';
import { Store } from '@ngxs/store';
import { UnitsStateSelectors } from './state/units-state.selectors';
import { map } from 'rxjs';
import { UnitsEmptyGuard } from './consts';

@Component({
  selector: 'app-units',
  standalone: true,
  imports: [
    CommonModule,
    PageComponent,
    PageTabDirective,
    PageActionsDirective,
    TuiLetModule,
    TuiButtonModule,
    TableComponent,
    PolymorpheusModule,
    RouterOutlet,
    TuiSelectModule,
    EmptyGuardComponent,
  ],
  templateUrl: './units.component.html',
  styleUrl: './units.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideTableQuery(UnitTableQueryDataProvider),
    provideDeleteCommand(RemoveUnit, {
      label: (unit: Unit) => `Удалить единицу измерения ${unit.fullName}?`,
      description: () => 'Восстановить единицу измерения будет невозможно',
    }),
    provideUpdateCommand(UpdateUnit, {
      label: () => `Сохранить изменения?`,
    }),
    provideToCreateCommand({ component: UnitsCreateModalComponent }),
    provideToEditCommand({
      component: UnitsDetailsComponent,
    }),
    provideEmptyGuardOptions(UnitsEmptyGuard),
  ],
})
export class UnitsComponent {
  private readonly _store = inject(Store);

  protected readonly toCreate = inject(ToCreateCommand);

  protected readonly deleteCommand = inject(DeleteCommand);

  protected readonly toEditCommand = inject<ToEditCommand<Unit>>(ToEditCommand);

  protected readonly units$ = this._store
    .select(UnitsStateSelectors.units)
    .pipe(map((units) => units.items));

  protected readonly columns: ColumnModel<Unit>[] = [
    {
      field: 'code',
      displayName: 'Код',
    },
    {
      field: 'name',
      displayName: 'Наименонание',
    },
    {
      field: 'fullName',
      displayName: 'Полное наименонание',
    },
  ];

  protected trackByRow: TrackByFunction<Unit> = (_index, unit) => unit.id;

  protected emptyUnitsHandler = () => this.toCreate.execute();

  protected readonly rowContext!: TuiContextWithImplicit<Unit>;
}
