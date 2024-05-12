/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Unit } from '../../models/unit';

export interface UnitsControllerDelete$Params {
  id: string;
}

export function unitsControllerDelete(http: HttpClient, rootUrl: string, params: UnitsControllerDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<Unit>> {
  const rb = new RequestBuilder(rootUrl, unitsControllerDelete.PATH, 'delete');
  if (params) {
    rb.path('id', params.id, {});
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

unitsControllerDelete.PATH = '/api/unit/{id}';
