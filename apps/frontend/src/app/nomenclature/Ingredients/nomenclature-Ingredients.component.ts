import {
  ChangeDetectionStrategy,
  Component,
  inject,
  TrackByFunction,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ingredient } from './models/ingredient.model';
import { TuiTableModule } from '@taiga-ui/addon-table';
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
import { IngredientsTableQueryDataProvider } from './table-data-provider';
import { RemoveIngredient, UpdateIngredient } from './state';
import { IngredientsEmptyGuard } from './consts';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';
import { TuiContextWithImplicit } from '@taiga-ui/cdk';
import { IngredientsStateSelectors } from './state/ingredients-state.selectors';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import { TuiButtonModule } from '@taiga-ui/core';
import { IngredientCreateComponent } from './create/ingredient-create.component';
import { IngredientEditComponent } from './edit/ingredient-edit.component';

@Component({
  selector: 'app-nomenclature-ingredients',
  standalone: true,
  imports: [
    CommonModule,
    TuiTableModule,
    EmptyGuardComponent,
    PageActionsDirective,
    PageComponent,
    PageTabDirective,
    TableComponent,
    PolymorpheusModule,
    TuiButtonModule,
  ],
  templateUrl: './nomenclature-Ingredients.component.html',
  styleUrl: './nomenclature-Ingredients.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideTableQuery(IngredientsTableQueryDataProvider),
    provideDeleteCommand(RemoveIngredient, {
      label: (ingredient: Ingredient) =>
        `Удалить ингредиент ${ingredient.name}?`,
      description: () => 'Восстановить ингредиент будет невозможно',
    }),
    provideUpdateCommand(UpdateIngredient),
    provideToCreateCommand({ component: IngredientCreateComponent }),
    provideToEditCommand({
      component: IngredientEditComponent,
      strategy: ToEditCommandStrategies.Modal,
    }),
    provideEmptyGuardOptions(IngredientsEmptyGuard),
  ],
})
export class NomenclatureIngredientsComponent {
  private readonly _store = inject(Store);

  protected readonly toCreate = inject(ToCreateCommand);

  protected readonly deleteCommand =
    inject<DeleteCommand<Ingredient>>(DeleteCommand);

  protected readonly toEditCommand =
    inject<ToEditCommand<Ingredient>>(ToEditCommand);

  protected readonly ingredients$ = this._store
    .select(IngredientsStateSelectors.ingredients)
    .pipe(map((ingredient) => ingredient.items));

  protected readonly ingredientsLoading$ = this._store.select(
    IngredientsStateSelectors.ingredientsLoading
  );

  protected readonly columns: ColumnModel<Ingredient>[] = [
    {
      field: 'name',
      displayName: 'Наименование',
    },
    {
      field: 'article',
      displayName: 'Артикул',
    },
    {
      field: 'weightKg',
      displayName: 'Вес базовой единицы, кг',
    },
  ];

  protected trackByRow: TrackByFunction<Ingredient> = (_index, ingredient) =>
    ingredient.id;

  protected emptyStockHandler = () => this.toCreate.execute();

  protected readonly rowContext!: TuiContextWithImplicit<Ingredient>;
}
