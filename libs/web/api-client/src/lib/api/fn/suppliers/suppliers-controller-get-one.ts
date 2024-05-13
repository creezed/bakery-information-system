/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Supplier } from '../../models/supplier';

export interface SuppliersControllerGetOne$Params {
  id: string;
}

export function suppliersControllerGetOne(http: HttpClient, rootUrl: string, params: SuppliersControllerGetOne$Params, context?: HttpContext): Observable<StrictHttpResponse<Supplier>> {
  const rb = new RequestBuilder(rootUrl, suppliersControllerGetOne.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Supplier>;
    })
  );
}

suppliersControllerGetOne.PATH = '/api/supplier/{id}';
