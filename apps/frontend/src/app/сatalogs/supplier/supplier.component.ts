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
import { SupplierTableDataProvider } from './table-data-provider/supplier-table-data-provider';
import { RemoveSupplier, UpdateSupplier } from './state';
import { Supplier } from './models';
import { SuppliersEmptyGuard } from './consts';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';
import { TuiContextWithImplicit } from '@taiga-ui/cdk';
import { SuppliersStateSelectors } from './state/suppliers-state.selectors';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import { TuiButtonModule } from '@taiga-ui/core';
import { SupplierCreateComponent } from './create/supplier-create.component';
import { SupplierEditComponent } from './edit/supplier-edit.component';

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [
    CommonModule,
    EmptyGuardComponent,
    PageActionsDirective,
    PageComponent,
    PageTabDirective,
    TableComponent,
    PolymorpheusModule,
    TuiButtonModule,
  ],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideTableQuery(SupplierTableDataProvider),
    provideDeleteCommand(RemoveSupplier, {
      label: (supplier: Supplier) => `Удалить поставщика ${supplier.name}?`,
      description: () => 'Восстановить поставщика будет невозможно',
    }),
    provideUpdateCommand(UpdateSupplier, {
      label: () => `Сохранить изменения?`,
    }),
    provideToCreateCommand({ component: SupplierCreateComponent }),
    provideToEditCommand({
      component: SupplierEditComponent,
      strategy: ToEditCommandStrategies.Modal,
    }),
    provideEmptyGuardOptions(SuppliersEmptyGuard),
  ],
})
export class SupplierComponent {
  private readonly _store = inject(Store);

  protected readonly toCreate = inject(ToCreateCommand);

  protected readonly deleteCommand = inject(DeleteCommand);

  protected readonly toEditCommand =
    inject<ToEditCommand<Supplier>>(ToEditCommand);

  protected readonly suppliers$ = this._store
    .select(SuppliersStateSelectors.suppliers)
    .pipe(map((suppliers) => suppliers.items));

  protected readonly columns: ColumnModel<Supplier>[] = [
    {
      field: 'email',
      displayName: 'Почта',
    },
    {
      field: 'name',
      displayName: 'Наименонание',
    },
    {
      field: 'phone',
      displayName: 'Номер',
    },
  ];

  protected trackByRow: TrackByFunction<Supplier> = (_index, supplier) =>
    supplier.id;

  protected emptySuppliersHandler = () => this.toCreate.execute();

  protected readonly rowContext!: TuiContextWithImplicit<Supplier>;
}
