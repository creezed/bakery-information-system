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
  ToEditCommandStrategies,
} from '@bakery-information-system/web/ui';
import { TuiContextWithImplicit, TuiLetModule } from '@taiga-ui/cdk';
import { Stock } from './models';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import { TuiButtonModule } from '@taiga-ui/core';
import { StockTableQueryDataProvider } from './table-data-provider';
import { RemoveStock, UpdateStock } from './state';
import { StockCreateComponent } from './create/stock-create.component';
import { StockEditComponent } from './edit/stock-edit.component';
import { LottieComponent } from 'ngx-lottie';
import { Store } from '@ngxs/store';
import { StocksStateSelectors } from './state/stocks-state.selectors';
import { map } from 'rxjs';
import { StockEmptyGuard } from './consts';

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [
    CommonModule,
    PageComponent,
    PageTabDirective,
    TableComponent,
    PolymorpheusModule,
    TuiButtonModule,
    PageActionsDirective,
    LottieComponent,
    EmptyGuardComponent,
    TuiLetModule,
  ],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideTableQuery(StockTableQueryDataProvider),
    provideDeleteCommand(RemoveStock, {
      label: (stock: Stock) => `Удалить склад ${stock.code}?`,
      description: () => 'Восстановить склад будет невозможно',
    }),
    provideUpdateCommand(UpdateStock),
    provideToCreateCommand({ component: StockCreateComponent }),
    provideToEditCommand({
      component: StockEditComponent,
      strategy: ToEditCommandStrategies.Modal,
    }),
    provideEmptyGuardOptions(StockEmptyGuard),
  ],
})
export class StocksComponent {
  private readonly _store = inject(Store);

  protected readonly toCreate = inject(ToCreateCommand);

  protected readonly deleteCommand =
    inject<DeleteCommand<Stock>>(DeleteCommand);

  protected readonly toEditCommand =
    inject<ToEditCommand<Stock>>(ToEditCommand);

  protected readonly stocks$ = this._store
    .select(StocksStateSelectors.stocks)
    .pipe(map((stock) => stock.items));

  protected readonly columns: ColumnModel<Stock>[] = [
    {
      field: 'code',
      displayName: 'Код',
    },
    {
      field: 'name',
      displayName: 'Наименование',
    },
    {
      field: 'description',
      displayName: 'Описание',
    },
  ];

  protected trackByRow: TrackByFunction<Stock> = (_index, stock) => stock.id;

  protected emptyStockHandler = () => this.toCreate.execute();

  protected readonly rowContext!: TuiContextWithImplicit<Stock>;
}
