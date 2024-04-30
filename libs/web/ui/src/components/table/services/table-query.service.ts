import { inject, Injectable } from '@angular/core';
import { TABLE_QUERY_STRATEGY_TOKEN } from '../tokens';
import {
  catchError,
  filter,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
} from 'rxjs';
import { tuiIsFalsy, tuiIsPresent } from '@taiga-ui/cdk';
import {
  AbstractTableQueryStrategy,
  TableData,
} from '../abstract/table-query.strategy';

@Injectable()
export class TableQueryService<TModel> {
  private readonly strategy = inject<AbstractTableQueryStrategy<TModel>>(
    TABLE_QUERY_STRATEGY_TOKEN
  );

  private readonly request$: Observable<TableData<TModel>> = this.strategy
    .loadData({})
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  public readonly isLoading$ = this.request$.pipe(
    map(tuiIsFalsy),
    catchError(() => of(false)),
    startWith(true)
  );

  public readonly data$: Observable<readonly TModel[]> = this.request$.pipe(
    filter(tuiIsPresent),
    map((req) => req.data),
    startWith([])
  );

  public total$ = this.request$.pipe(
    filter(tuiIsPresent),
    map((response) => response.total)
  );
}
