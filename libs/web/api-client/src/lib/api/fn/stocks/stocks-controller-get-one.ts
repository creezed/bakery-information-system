/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Stock } from '../../models/stock';

export interface StocksControllerGetOne$Params {
  id: string;
}

export function stocksControllerGetOne(http: HttpClient, rootUrl: string, params: StocksControllerGetOne$Params, context?: HttpContext): Observable<StrictHttpResponse<Stock>> {
  const rb = new RequestBuilder(rootUrl, stocksControllerGetOne.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Stock>;
    })
  );
}

stocksControllerGetOne.PATH = '/api/stock/{id}';
