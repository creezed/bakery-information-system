/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { JsonPatchDto } from '../../models/json-patch-dto';
import { Supplier } from '../../models/supplier';

export interface SuppliersControllerPatch$Params {
  id: string;
      body: JsonPatchDto
}

export function suppliersControllerPatch(http: HttpClient, rootUrl: string, params: SuppliersControllerPatch$Params, context?: HttpContext): Observable<StrictHttpResponse<Supplier>> {
  const rb = new RequestBuilder(rootUrl, suppliersControllerPatch.PATH, 'patch');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
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

suppliersControllerPatch.PATH = '/api/supplier/{id}';
