/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CreateIngredientDto } from '../../models/create-ingredient-dto';
import { Ingredient } from '../../models/ingredient';

export interface IngredientsControllerCreate$Params {
  
    /**
     * Json structure for ingredient object
     */
    body: CreateIngredientDto
}

export function ingredientsControllerCreate(http: HttpClient, rootUrl: string, params: IngredientsControllerCreate$Params, context?: HttpContext): Observable<StrictHttpResponse<Ingredient>> {
  const rb = new RequestBuilder(rootUrl, ingredientsControllerCreate.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Ingredient>;
    })
  );
}

ingredientsControllerCreate.PATH = '/api/ingredient';
