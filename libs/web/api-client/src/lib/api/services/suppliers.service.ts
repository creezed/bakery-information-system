/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { PaginatedDocumented } from '../models/paginated-documented';
import { Supplier } from '../models/supplier';
import { suppliersControllerCreate } from '../fn/suppliers/suppliers-controller-create';
import { SuppliersControllerCreate$Params } from '../fn/suppliers/suppliers-controller-create';
import { suppliersControllerDelete } from '../fn/suppliers/suppliers-controller-delete';
import { SuppliersControllerDelete$Params } from '../fn/suppliers/suppliers-controller-delete';
import { suppliersControllerGetAll } from '../fn/suppliers/suppliers-controller-get-all';
import { SuppliersControllerGetAll$Params } from '../fn/suppliers/suppliers-controller-get-all';
import { suppliersControllerGetOne } from '../fn/suppliers/suppliers-controller-get-one';
import { SuppliersControllerGetOne$Params } from '../fn/suppliers/suppliers-controller-get-one';
import { suppliersControllerPatch } from '../fn/suppliers/suppliers-controller-patch';
import { SuppliersControllerPatch$Params } from '../fn/suppliers/suppliers-controller-patch';

@Injectable({ providedIn: 'root' })
export class SuppliersService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `suppliersControllerGetAll()` */
  static readonly SuppliersControllerGetAllPath = '/api/supplier';

  /**
   * get all suppliers.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `suppliersControllerGetAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  suppliersControllerGetAll$Response(params?: SuppliersControllerGetAll$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginatedDocumented & {
'data'?: Array<Supplier>;
}>> {
    return suppliersControllerGetAll(this.http, this.rootUrl, params, context);
  }

  /**
   * get all suppliers.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `suppliersControllerGetAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  suppliersControllerGetAll(params?: SuppliersControllerGetAll$Params, context?: HttpContext): Observable<PaginatedDocumented & {
'data'?: Array<Supplier>;
}> {
    return this.suppliersControllerGetAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<PaginatedDocumented & {
'data'?: Array<Supplier>;
}>): PaginatedDocumented & {
'data'?: Array<Supplier>;
} => r.body)
    );
  }

  /** Path part for operation `suppliersControllerCreate()` */
  static readonly SuppliersControllerCreatePath = '/api/supplier';

  /**
   * create a new supplier.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `suppliersControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  suppliersControllerCreate$Response(params: SuppliersControllerCreate$Params, context?: HttpContext): Observable<StrictHttpResponse<Supplier>> {
    return suppliersControllerCreate(this.http, this.rootUrl, params, context);
  }

  /**
   * create a new supplier.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `suppliersControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  suppliersControllerCreate(params: SuppliersControllerCreate$Params, context?: HttpContext): Observable<Supplier> {
    return this.suppliersControllerCreate$Response(params, context).pipe(
      map((r: StrictHttpResponse<Supplier>): Supplier => r.body)
    );
  }

  /** Path part for operation `suppliersControllerGetOne()` */
  static readonly SuppliersControllerGetOnePath = '/api/supplier/{id}';

  /**
   * get one supplier.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `suppliersControllerGetOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  suppliersControllerGetOne$Response(params: SuppliersControllerGetOne$Params, context?: HttpContext): Observable<StrictHttpResponse<Supplier>> {
    return suppliersControllerGetOne(this.http, this.rootUrl, params, context);
  }

  /**
   * get one supplier.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `suppliersControllerGetOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  suppliersControllerGetOne(params: SuppliersControllerGetOne$Params, context?: HttpContext): Observable<Supplier> {
    return this.suppliersControllerGetOne$Response(params, context).pipe(
      map((r: StrictHttpResponse<Supplier>): Supplier => r.body)
    );
  }

  /** Path part for operation `suppliersControllerDelete()` */
  static readonly SuppliersControllerDeletePath = '/api/supplier/{id}';

  /**
   * delete supplier.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `suppliersControllerDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  suppliersControllerDelete$Response(params: SuppliersControllerDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<Supplier>> {
    return suppliersControllerDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * delete supplier.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `suppliersControllerDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  suppliersControllerDelete(params: SuppliersControllerDelete$Params, context?: HttpContext): Observable<Supplier> {
    return this.suppliersControllerDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<Supplier>): Supplier => r.body)
    );
  }

  /** Path part for operation `suppliersControllerPatch()` */
  static readonly SuppliersControllerPatchPath = '/api/supplier/{id}';

  /**
   * update supplier.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `suppliersControllerPatch()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  suppliersControllerPatch$Response(params: SuppliersControllerPatch$Params, context?: HttpContext): Observable<StrictHttpResponse<Supplier>> {
    return suppliersControllerPatch(this.http, this.rootUrl, params, context);
  }

  /**
   * update supplier.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `suppliersControllerPatch$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  suppliersControllerPatch(params: SuppliersControllerPatch$Params, context?: HttpContext): Observable<Supplier> {
    return this.suppliersControllerPatch$Response(params, context).pipe(
      map((r: StrictHttpResponse<Supplier>): Supplier => r.body)
    );
  }

}
