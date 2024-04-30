import { AbstractTableQueryStrategy } from '../abstract';
import { Provider, Type } from '@angular/core';
import { TABLE_QUERY_STRATEGY_TOKEN } from '../tokens';
import { TableQueryService } from '../services';

export function provideTableQuery(
  strategy: Type<AbstractTableQueryStrategy<unknown>>
): Provider[] {
  return [
    {
      provide: TABLE_QUERY_STRATEGY_TOKEN,
      useClass: strategy,
    },
    TableQueryService,
  ];
}
