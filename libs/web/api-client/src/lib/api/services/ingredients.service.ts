/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { CheckUniqueModel } from '../models/check-unique-model';
import { Ingredient } from '../models/ingredient';
import { ingredientsControllerCheckUniqueArticle } from '../fn/ingredients/ingredients-controller-check-unique-article';
import { IngredientsControllerCheckUniqueArticle$Params } from '../fn/ingredients/ingredients-controller-check-unique-article';
import { ingredientsControllerCreate } from '../fn/ingredients/ingredients-controller-create';
import { IngredientsControllerCreate$Params } from '../fn/ingredients/ingredients-controller-create';
import { ingredientsControllerDelete } from '../fn/ingredients/ingredients-controller-delete';
import { IngredientsControllerDelete$Params } from '../fn/ingredients/ingredients-controller-delete';
import { ingredientsControllerGetAll } from '../fn/ingredients/ingredients-controller-get-all';
import { IngredientsControllerGetAll$Params } from '../fn/ingredients/ingredients-controller-get-all';
import { ingredientsControllerGetOne } from '../fn/ingredients/ingredients-controller-get-one';
import { IngredientsControllerGetOne$Params } from '../fn/ingredients/ingredients-controller-get-one';
import { ingredientsControllerPatch } from '../fn/ingredients/ingredients-controller-patch';
import { IngredientsControllerPatch$Params } from '../fn/ingredients/ingredients-controller-patch';
import { PaginatedDocumented } from '../models/paginated-documented';

@Injectable({ providedIn: 'root' })
export class IngredientsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `ingredientsControllerGetAll()` */
  static readonly IngredientsControllerGetAllPath = '/api/ingredient';

  /**
   * get ingredients.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `ingredientsControllerGetAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  ingredientsControllerGetAll$Response(params?: IngredientsControllerGetAll$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginatedDocumented & {
'data'?: Array<Ingredient>;
}>> {
    return ingredientsControllerGetAll(this.http, this.rootUrl, params, context);
  }

  /**
   * get ingredients.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `ingredientsControllerGetAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  ingredientsControllerGetAll(params?: IngredientsControllerGetAll$Params, context?: HttpContext): Observable<PaginatedDocumented & {
'data'?: Array<Ingredient>;
}> {
    return this.ingredientsControllerGetAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<PaginatedDocumented & {
'data'?: Array<Ingredient>;
}>): PaginatedDocumented & {
'data'?: Array<Ingredient>;
} => r.body)
    );
  }

  /** Path part for operation `ingredientsControllerCreate()` */
  static readonly IngredientsControllerCreatePath = '/api/ingredient';

  /**
   * create a new ingredient.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `ingredientsControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  ingredientsControllerCreate$Response(params: IngredientsControllerCreate$Params, context?: HttpContext): Observable<StrictHttpResponse<Ingredient>> {
    return ingredientsControllerCreate(this.http, this.rootUrl, params, context);
  }

  /**
   * create a new ingredient.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `ingredientsControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  ingredientsControllerCreate(params: IngredientsControllerCreate$Params, context?: HttpContext): Observable<Ingredient> {
    return this.ingredientsControllerCreate$Response(params, context).pipe(
      map((r: StrictHttpResponse<Ingredient>): Ingredient => r.body)
    );
  }

  /** Path part for operation `ingredientsControllerGetOne()` */
  static readonly IngredientsControllerGetOnePath = '/api/ingredient/{id}';

  /**
   * get one ingredient.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `ingredientsControllerGetOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  ingredientsControllerGetOne$Response(params: IngredientsControllerGetOne$Params, context?: HttpContext): Observable<StrictHttpResponse<Ingredient>> {
    return ingredientsControllerGetOne(this.http, this.rootUrl, params, context);
  }

  /**
   * get one ingredient.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `ingredientsControllerGetOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  ingredientsControllerGetOne(params: IngredientsControllerGetOne$Params, context?: HttpContext): Observable<Ingredient> {
    return this.ingredientsControllerGetOne$Response(params, context).pipe(
      map((r: StrictHttpResponse<Ingredient>): Ingredient => r.body)
    );
  }

  /** Path part for operation `ingredientsControllerDelete()` */
  static readonly IngredientsControllerDeletePath = '/api/ingredient/{id}';

  /**
   * delete ingredient.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `ingredientsControllerDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  ingredientsControllerDelete$Response(params: IngredientsControllerDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<Ingredient>> {
    return ingredientsControllerDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * delete ingredient.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `ingredientsControllerDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  ingredientsControllerDelete(params: IngredientsControllerDelete$Params, context?: HttpContext): Observable<Ingredient> {
    return this.ingredientsControllerDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<Ingredient>): Ingredient => r.body)
    );
  }

  /** Path part for operation `ingredientsControllerPatch()` */
  static readonly IngredientsControllerPatchPath = '/api/ingredient/{id}';

  /**
   * update ingredient.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `ingredientsControllerPatch()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  ingredientsControllerPatch$Response(params: IngredientsControllerPatch$Params, context?: HttpContext): Observable<StrictHttpResponse<Ingredient>> {
    return ingredientsControllerPatch(this.http, this.rootUrl, params, context);
  }

  /**
   * update ingredient.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `ingredientsControllerPatch$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  ingredientsControllerPatch(params: IngredientsControllerPatch$Params, context?: HttpContext): Observable<Ingredient> {
    return this.ingredientsControllerPatch$Response(params, context).pipe(
      map((r: StrictHttpResponse<Ingredient>): Ingredient => r.body)
    );
  }

  /** Path part for operation `ingredientsControllerCheckUniqueArticle()` */
  static readonly IngredientsControllerCheckUniqueArticlePath = '/api/ingredient/check-unique/{article}';

  /**
   * check unique article.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `ingredientsControllerCheckUniqueArticle()` instead.
   *
   * This method doesn't expect any request body.
   */
  ingredientsControllerCheckUniqueArticle$Response(params: IngredientsControllerCheckUniqueArticle$Params, context?: HttpContext): Observable<StrictHttpResponse<CheckUniqueModel>> {
    return ingredientsControllerCheckUniqueArticle(this.http, this.rootUrl, params, context);
  }

  /**
   * check unique article.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `ingredientsControllerCheckUniqueArticle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  ingredientsControllerCheckUniqueArticle(params: IngredientsControllerCheckUniqueArticle$Params, context?: HttpContext): Observable<CheckUniqueModel> {
    return this.ingredientsControllerCheckUniqueArticle$Response(params, context).pipe(
      map((r: StrictHttpResponse<CheckUniqueModel>): CheckUniqueModel => r.body)
    );
  }

}
