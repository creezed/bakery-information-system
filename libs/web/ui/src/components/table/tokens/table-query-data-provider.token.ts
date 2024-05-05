import { InjectionToken } from '@angular/core';
import { AbstractTableQueryDataProvider } from '../abstract';

export const TABLE_QUERY_DATA_PROVIDER_TOKEN = new InjectionToken<
  AbstractTableQueryDataProvider<unknown>
>('');
