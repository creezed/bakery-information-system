/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PaginatedDocumented } from '../../models/paginated-documented';
import { Supplier } from '../../models/supplier';

export interface SuppliersControllerGetAll$Params {
  page?: number;
  limit?: number;
  sortBy?: string;
  search?: string;
}

export function suppliersControllerGetAll(http: HttpClient, rootUrl: string, params?: SuppliersControllerGetAll$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginatedDocumented & {
'data'?: Array<Supplier>;
}>> {
  const rb = new RequestBuilder(rootUrl, suppliersControllerGetAll.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('limit', params.limit, {});
    rb.query('sortBy', params.sortBy, {});
    rb.query('search', params.search, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PaginatedDocumented & {
      'data'?: Array<Supplier>;
      }>;
    })
  );
}

suppliersControllerGetAll.PATH = '/api/supplier';
