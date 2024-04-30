import { InjectionToken } from '@angular/core';
import { AbstractTableQueryStrategy } from '../abstract';

export const TABLE_QUERY_STRATEGY_TOKEN = new InjectionToken<
  AbstractTableQueryStrategy<unknown>
>('');
