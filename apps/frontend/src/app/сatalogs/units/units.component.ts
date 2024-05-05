import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitsDataSourceService } from './services';
import {
  ColumnModel,
  ConfirmOptions,
  DELETE_COMMAND_TOKEN,
  PageActionsDirective,
  PageComponent,
  PageDetailsService,
  PageTabDirective,
  provideTableQuery,
  TableComponent,
} from '@bakery-information-system/web/ui';
import {
  ToUpdateCommand,
  UnitDeleteCommand,
  UnitOpenCreateModalCommand,
} from './commands';
import { TuiContextWithImplicit, TuiLetModule } from '@taiga-ui/cdk';
import { TuiButtonModule } from '@taiga-ui/core';
import { Unit } from './models/unit.model';
import { UnitTableQueryStrategy } from './table-strategy';
import {
  PolymorpheusComponent,
  PolymorpheusModule,
} from '@tinkoff/ng-polymorpheus';
import { RouterOutlet } from '@angular/router';
import { UnitsDetailsComponent } from './details/units-details.component';
import { take } from 'rxjs';
import { RemoveUnit } from './state';

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
  ],
  templateUrl: './units.component.html',
  styleUrl: './units.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideTableQuery(UnitTableQueryStrategy),
    {
      provide: DELETE_COMMAND_TOKEN,
      useValue: {
        label: (unit: Unit) => `Удалить единицу измерения ${unit.fullName}?`,
        action: RemoveUnit,
        appearance: {
          label: 'Удалить',
          icon: 'tuiIconTrash',
        },
        description: () => 'Восстановить единицу измерения будет невозможно',
        yesText: 'Удалить',
        noText: 'Отменить',
      } as ConfirmOptions<Unit>,
    },
    UnitDeleteCommand,
    ToUpdateCommand,
    UnitOpenCreateModalCommand,
  ],
})
export class UnitsComponent {
  private readonly _dataSourceService = inject(UnitsDataSourceService);
  private readonly _pageDetailsService = inject(PageDetailsService);

  protected readonly createModalCommand = inject(UnitOpenCreateModalCommand);

  protected readonly deleteCommand = inject(UnitDeleteCommand);

  protected readonly toUpdateCommand = inject(ToUpdateCommand);

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

  protected toUpdate(unit: Unit) {
    this._pageDetailsService
      .open({
        content: new PolymorpheusComponent(UnitsDetailsComponent),
        data: { unit },
      })
      .pipe(take(1))
      .subscribe();
  }

  protected readonly rowContext!: TuiContextWithImplicit<Unit>;
}
