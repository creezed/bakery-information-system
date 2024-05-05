import { Provider, Type } from '@angular/core';
import { TABLE_QUERY_DATA_PROVIDER_TOKEN } from '../tokens';
import { TableQueryService } from '../services';
import { AbstractTableQueryDataProvider } from '../abstract';

export function provideTableQuery(
  dataProvider: Type<AbstractTableQueryDataProvider<unknown>>
): Provider[] {
  return [
    {
      provide: TABLE_QUERY_DATA_PROVIDER_TOKEN,
      useClass: dataProvider,
    },
    TableQueryService,
  ];
}
