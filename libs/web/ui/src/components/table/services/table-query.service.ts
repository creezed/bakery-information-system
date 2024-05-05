import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  filter,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';
import { tuiIsFalsy, tuiIsPresent } from '@taiga-ui/cdk';
import {
  AbstractTableQueryDataProvider,
  TableData,
} from '../abstract/table-query-data-provider';
import { TABLE_QUERY_DATA_PROVIDER_TOKEN } from '../tokens';
import { TuiTablePagination } from '@taiga-ui/addon-table';

@Injectable()
export class TableQueryService<TModel> {
  private readonly dataProvider = inject<
    AbstractTableQueryDataProvider<TModel>
  >(TABLE_QUERY_DATA_PROVIDER_TOKEN);

  private readonly pagination$ = new BehaviorSubject<TuiTablePagination>({
    size: 10,
    page: 0,
  });

  private readonly request$: Observable<TableData<TModel>> = combineLatest([
    this.pagination$,
  ]).pipe(
    switchMap(([pagination]) =>
      this.dataProvider.loadData({
        currentPage: pagination.page,
        itemsPerPage: pagination.size,
      })
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  public readonly isLoading$ =
    this.dataProvider.isLoading$ ??
    this.request$.pipe(
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

  public paginationChange(result: TuiTablePagination): void {
    this.pagination$.next(result);
  }
}
