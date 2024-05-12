/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CreateStockDto } from '../../models/create-stock-dto';
import { Stock } from '../../models/stock';

export interface StocksControllerCreate$Params {
  
    /**
     * Json structure for stock object
     */
    body: CreateStockDto
}

export function stocksControllerCreate(http: HttpClient, rootUrl: string, params: StocksControllerCreate$Params, context?: HttpContext): Observable<StrictHttpResponse<Stock>> {
  const rb = new RequestBuilder(rootUrl, stocksControllerCreate.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
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

stocksControllerCreate.PATH = '/api/stock';
