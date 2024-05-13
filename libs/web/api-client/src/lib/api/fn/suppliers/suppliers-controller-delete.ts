/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Supplier } from '../../models/supplier';

export interface SuppliersControllerDelete$Params {
  id: string;
}

export function suppliersControllerDelete(http: HttpClient, rootUrl: string, params: SuppliersControllerDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<Supplier>> {
  const rb = new RequestBuilder(rootUrl, suppliersControllerDelete.PATH, 'delete');
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

suppliersControllerDelete.PATH = '/api/supplier/{id}';
