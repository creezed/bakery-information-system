/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PaginatedDocumented } from '../../models/paginated-documented';
import { Stock } from '../../models/stock';

export interface StocksControllerGetAll$Params {
  page?: number;
  limit?: number;
  sortBy?: Array<any>;
}

export function stocksControllerGetAll(http: HttpClient, rootUrl: string, params?: StocksControllerGetAll$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginatedDocumented & {
'data'?: Array<Stock>;
}>> {
  const rb = new RequestBuilder(rootUrl, stocksControllerGetAll.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('limit', params.limit, {});
    rb.query('sortBy', params.sortBy, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PaginatedDocumented & {
      'data'?: Array<Stock>;
      }>;
    })
  );
}

stocksControllerGetAll.PATH = '/api/stocks';
