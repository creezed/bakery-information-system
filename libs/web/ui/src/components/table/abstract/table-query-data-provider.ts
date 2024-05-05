import { Observable } from 'rxjs';

export interface TableOutputData {
  readonly currentPage: number;
  readonly itemsPerPage: number;
}

export interface TableData<T> {
  data: T[];
  total: number;
}

export abstract class AbstractTableQueryDataProvider<TModel> {
  abstract loadData(
    data: Partial<TableOutputData>
  ): Observable<TableData<TModel>>;

  public isLoading$?: Observable<boolean>;
}
