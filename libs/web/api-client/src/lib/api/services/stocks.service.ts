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
import { Stock } from '../models/stock';
import { stocksControllerCreate } from '../fn/stocks/stocks-controller-create';
import { StocksControllerCreate$Params } from '../fn/stocks/stocks-controller-create';
import { stocksControllerDelete } from '../fn/stocks/stocks-controller-delete';
import { StocksControllerDelete$Params } from '../fn/stocks/stocks-controller-delete';
import { stocksControllerGetAll } from '../fn/stocks/stocks-controller-get-all';
import { StocksControllerGetAll$Params } from '../fn/stocks/stocks-controller-get-all';
import { stocksControllerGetOne } from '../fn/stocks/stocks-controller-get-one';
import { StocksControllerGetOne$Params } from '../fn/stocks/stocks-controller-get-one';
import { stocksControllerPatch } from '../fn/stocks/stocks-controller-patch';
import { StocksControllerPatch$Params } from '../fn/stocks/stocks-controller-patch';

@Injectable({ providedIn: 'root' })
export class StocksService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `stocksControllerGetAll()` */
  static readonly StocksControllerGetAllPath = '/api/stocks';

  /**
   * get all stocks.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `stocksControllerGetAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  stocksControllerGetAll$Response(params?: StocksControllerGetAll$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginatedDocumented & {
'data'?: Array<Stock>;
}>> {
    return stocksControllerGetAll(this.http, this.rootUrl, params, context);
  }

  /**
   * get all stocks.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `stocksControllerGetAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  stocksControllerGetAll(params?: StocksControllerGetAll$Params, context?: HttpContext): Observable<PaginatedDocumented & {
'data'?: Array<Stock>;
}> {
    return this.stocksControllerGetAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<PaginatedDocumented & {
'data'?: Array<Stock>;
}>): PaginatedDocumented & {
'data'?: Array<Stock>;
} => r.body)
    );
  }

  /** Path part for operation `stocksControllerCreate()` */
  static readonly StocksControllerCreatePath = '/api/stocks';

  /**
   * create a new stock.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `stocksControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  stocksControllerCreate$Response(params: StocksControllerCreate$Params, context?: HttpContext): Observable<StrictHttpResponse<Stock>> {
    return stocksControllerCreate(this.http, this.rootUrl, params, context);
  }

  /**
   * create a new stock.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `stocksControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  stocksControllerCreate(params: StocksControllerCreate$Params, context?: HttpContext): Observable<Stock> {
    return this.stocksControllerCreate$Response(params, context).pipe(
      map((r: StrictHttpResponse<Stock>): Stock => r.body)
    );
  }

  /** Path part for operation `stocksControllerGetOne()` */
  static readonly StocksControllerGetOnePath = '/api/stocks/{id}';

  /**
   * get one stock.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `stocksControllerGetOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  stocksControllerGetOne$Response(params: StocksControllerGetOne$Params, context?: HttpContext): Observable<StrictHttpResponse<Stock>> {
    return stocksControllerGetOne(this.http, this.rootUrl, params, context);
  }

  /**
   * get one stock.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `stocksControllerGetOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  stocksControllerGetOne(params: StocksControllerGetOne$Params, context?: HttpContext): Observable<Stock> {
    return this.stocksControllerGetOne$Response(params, context).pipe(
      map((r: StrictHttpResponse<Stock>): Stock => r.body)
    );
  }

  /** Path part for operation `stocksControllerDelete()` */
  static readonly StocksControllerDeletePath = '/api/stocks/{id}';

  /**
   * delete stock.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `stocksControllerDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  stocksControllerDelete$Response(params: StocksControllerDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<Stock>> {
    return stocksControllerDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * delete stock.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `stocksControllerDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  stocksControllerDelete(params: StocksControllerDelete$Params, context?: HttpContext): Observable<Stock> {
    return this.stocksControllerDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<Stock>): Stock => r.body)
    );
  }

  /** Path part for operation `stocksControllerPatch()` */
  static readonly StocksControllerPatchPath = '/api/stocks/{id}';

  /**
   * update stock.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `stocksControllerPatch()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  stocksControllerPatch$Response(params: StocksControllerPatch$Params, context?: HttpContext): Observable<StrictHttpResponse<Stock>> {
    return stocksControllerPatch(this.http, this.rootUrl, params, context);
  }

  /**
   * update stock.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `stocksControllerPatch$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  stocksControllerPatch(params: StocksControllerPatch$Params, context?: HttpContext): Observable<Stock> {
    return this.stocksControllerPatch$Response(params, context).pipe(
      map((r: StrictHttpResponse<Stock>): Stock => r.body)
    );
  }

}
