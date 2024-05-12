/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CreateUnitDto } from '../../models/create-unit-dto';
import { Unit } from '../../models/unit';

export interface UnitsControllerCreate$Params {
  
    /**
     * Json structure for unit object
     */
    body: CreateUnitDto
}

export function unitsControllerCreate(http: HttpClient, rootUrl: string, params: UnitsControllerCreate$Params, context?: HttpContext): Observable<StrictHttpResponse<Unit>> {
  const rb = new RequestBuilder(rootUrl, unitsControllerCreate.PATH, 'post');
  if (params) {
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

unitsControllerCreate.PATH = '/api/unit';
