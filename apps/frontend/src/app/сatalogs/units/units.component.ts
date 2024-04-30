import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitsDatasourceService } from './services';
import {
  ColumnModel,
  COMMANDS_TOKEN,
  PageActionsDirective,
  PageComponent,
  PageTabDirective,
  provideTableQuery,
  TableComponent,
} from '@bakery-information-system/ui';
import { CreateCommand } from './commands';
import { TuiContextWithImplicit, TuiLetModule } from '@taiga-ui/cdk';
import { TuiButtonModule } from '@taiga-ui/core';
import { Unit } from './models/unit.model';
import { UnitTableQueryStrategy } from './table-strategy';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';

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
  ],
  templateUrl: './units.component.html',
  styleUrl: './units.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: COMMANDS_TOKEN,
      multi: true,
      useClass: CreateCommand,
    },
    provideTableQuery(UnitTableQueryStrategy),
  ],
})
export class UnitsComponent {
  private readonly _dataSourceService = inject(UnitsDatasourceService);

  protected readonly commands = inject(COMMANDS_TOKEN).map((command) =>
    command.build()
  );

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

  protected readonly rowContext!: TuiContextWithImplicit<Unit>;

  protected readonly units$ = this._dataSourceService.getAll();
}
