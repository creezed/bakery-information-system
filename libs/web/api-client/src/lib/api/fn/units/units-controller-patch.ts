/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { JsonPatchDto } from '../../models/json-patch-dto';
import { Unit } from '../../models/unit';

export interface UnitsControllerPatch$Params {
  id: string;
      body: JsonPatchDto
}

export function unitsControllerPatch(http: HttpClient, rootUrl: string, params: UnitsControllerPatch$Params, context?: HttpContext): Observable<StrictHttpResponse<Unit>> {
  const rb = new RequestBuilder(rootUrl, unitsControllerPatch.PATH, 'patch');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Unit>;
    })
  );
}

unitsControllerPatch.PATH = '/api/units/{id}';
