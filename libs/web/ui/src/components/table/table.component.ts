import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  TrackByFunction,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiTableModule,
  TuiTablePaginationModule,
} from '@taiga-ui/addon-table';
import { TuiLetModule } from '@taiga-ui/cdk';
import { ColumnModel } from './interfaces/column.model';
import { TableQueryService } from './services';
import { TuiLoaderModule, TuiScrollbarModule } from '@taiga-ui/core';
import {
  PolymorpheusModule,
  PolymorpheusTemplate,
} from '@tinkoff/ng-polymorpheus';
import { identity } from 'rxjs';

@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [
    CommonModule,
    TuiTableModule,
    TuiLetModule,
    TuiLoaderModule,
    TuiTablePaginationModule,
    PolymorpheusModule,
    TuiScrollbarModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<TModel> {
  protected readonly service = inject(TableQueryService);

  @Input({ required: true })
  public columns: ColumnModel<TModel>[] = [];

  @Input()
  public trackBy: TrackByFunction<TModel> = identity;

  @Input()
  public actions?: PolymorpheusTemplate;
}
