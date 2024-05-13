/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CreateSupplierDto } from '../../models/create-supplier-dto';
import { Supplier } from '../../models/supplier';

export interface SuppliersControllerCreate$Params {
  
    /**
     * Json structure for supplier object
     */
    body: CreateSupplierDto
}

export function suppliersControllerCreate(http: HttpClient, rootUrl: string, params: SuppliersControllerCreate$Params, context?: HttpContext): Observable<StrictHttpResponse<Supplier>> {
  const rb = new RequestBuilder(rootUrl, suppliersControllerCreate.PATH, 'post');
  if (params) {
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

suppliersControllerCreate.PATH = '/api/supplier';
