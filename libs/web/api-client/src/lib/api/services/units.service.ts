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
import { Unit } from '../models/unit';
import { unitsControllerCreate } from '../fn/units/units-controller-create';
import { UnitsControllerCreate$Params } from '../fn/units/units-controller-create';
import { unitsControllerDelete } from '../fn/units/units-controller-delete';
import { UnitsControllerDelete$Params } from '../fn/units/units-controller-delete';
import { unitsControllerGetAll } from '../fn/units/units-controller-get-all';
import { UnitsControllerGetAll$Params } from '../fn/units/units-controller-get-all';
import { unitsControllerGetOne } from '../fn/units/units-controller-get-one';
import { UnitsControllerGetOne$Params } from '../fn/units/units-controller-get-one';

@Injectable({ providedIn: 'root' })
export class UnitsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `unitsControllerGetAll()` */
  static readonly UnitsControllerGetAllPath = '/api/units';

  /**
   * get all units.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unitsControllerGetAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  unitsControllerGetAll$Response(params?: UnitsControllerGetAll$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginatedDocumented & {
'data'?: Array<Unit>;
}>> {
    return unitsControllerGetAll(this.http, this.rootUrl, params, context);
  }

  /**
   * get all units.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `unitsControllerGetAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unitsControllerGetAll(params?: UnitsControllerGetAll$Params, context?: HttpContext): Observable<PaginatedDocumented & {
'data'?: Array<Unit>;
}> {
    return this.unitsControllerGetAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<PaginatedDocumented & {
'data'?: Array<Unit>;
}>): PaginatedDocumented & {
'data'?: Array<Unit>;
} => r.body)
    );
  }

  /** Path part for operation `unitsControllerCreate()` */
  static readonly UnitsControllerCreatePath = '/api/units';

  /**
   * create a new unit.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unitsControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  unitsControllerCreate$Response(params: UnitsControllerCreate$Params, context?: HttpContext): Observable<StrictHttpResponse<Unit>> {
    return unitsControllerCreate(this.http, this.rootUrl, params, context);
  }

  /**
   * create a new unit.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `unitsControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  unitsControllerCreate(params: UnitsControllerCreate$Params, context?: HttpContext): Observable<Unit> {
    return this.unitsControllerCreate$Response(params, context).pipe(
      map((r: StrictHttpResponse<Unit>): Unit => r.body)
    );
  }

  /** Path part for operation `unitsControllerGetOne()` */
  static readonly UnitsControllerGetOnePath = '/api/units/{id}';

  /**
   * get one unit.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unitsControllerGetOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  unitsControllerGetOne$Response(params: UnitsControllerGetOne$Params, context?: HttpContext): Observable<StrictHttpResponse<Unit>> {
    return unitsControllerGetOne(this.http, this.rootUrl, params, context);
  }

  /**
   * get one unit.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `unitsControllerGetOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unitsControllerGetOne(params: UnitsControllerGetOne$Params, context?: HttpContext): Observable<Unit> {
    return this.unitsControllerGetOne$Response(params, context).pipe(
      map((r: StrictHttpResponse<Unit>): Unit => r.body)
    );
  }

  /** Path part for operation `unitsControllerDelete()` */
  static readonly UnitsControllerDeletePath = '/api/units/{id}';

  /**
   * delete unit.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unitsControllerDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  unitsControllerDelete$Response(params: UnitsControllerDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<Unit>> {
    return unitsControllerDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * delete unit.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `unitsControllerDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unitsControllerDelete(params: UnitsControllerDelete$Params, context?: HttpContext): Observable<Unit> {
    return this.unitsControllerDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<Unit>): Unit => r.body)
    );
  }

}
