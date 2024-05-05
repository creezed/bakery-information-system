/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PaginatedDocumented } from '../../models/paginated-documented';
import { Unit } from '../../models/unit';

export interface UnitsControllerGetAll$Params {
  page?: number;
  limit?: number;
  sortBy?: Array<any>;
}

export function unitsControllerGetAll(http: HttpClient, rootUrl: string, params?: UnitsControllerGetAll$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginatedDocumented & {
'data'?: Array<Unit>;
}>> {
  const rb = new RequestBuilder(rootUrl, unitsControllerGetAll.PATH, 'get');
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
      'data'?: Array<Unit>;
      }>;
    })
  );
}

unitsControllerGetAll.PATH = '/api/units';
