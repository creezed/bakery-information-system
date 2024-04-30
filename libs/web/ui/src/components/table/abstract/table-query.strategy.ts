import { Observable } from 'rxjs';

interface TableOutputData {
  readonly currentPage: number;
  readonly itemsPerPage: number;
}

export interface TableData<T> {
  data: T[];
  total: number;
}

export abstract class AbstractTableQueryStrategy<TModel> {
  abstract loadData(
    data: Partial<TableOutputData>
  ): Observable<TableData<TModel>>;
}
