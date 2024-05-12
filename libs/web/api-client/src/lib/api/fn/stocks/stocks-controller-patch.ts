/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { JsonPatchDto } from '../../models/json-patch-dto';
import { Stock } from '../../models/stock';

export interface StocksControllerPatch$Params {
  id: string;
      body: JsonPatchDto
}

export function stocksControllerPatch(http: HttpClient, rootUrl: string, params: StocksControllerPatch$Params, context?: HttpContext): Observable<StrictHttpResponse<Stock>> {
  const rb = new RequestBuilder(rootUrl, stocksControllerPatch.PATH, 'patch');
  if (params) {
    rb.path('id', params.id, {});
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

stocksControllerPatch.PATH = '/api/stock/{id}';
