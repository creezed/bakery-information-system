/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Ingredient } from '../../models/ingredient';
import { JsonPatchDto } from '../../models/json-patch-dto';

export interface IngredientsControllerPatch$Params {
  id: string;
      body: JsonPatchDto
}

export function ingredientsControllerPatch(http: HttpClient, rootUrl: string, params: IngredientsControllerPatch$Params, context?: HttpContext): Observable<StrictHttpResponse<Ingredient>> {
  const rb = new RequestBuilder(rootUrl, ingredientsControllerPatch.PATH, 'patch');
  if (params) {
    rb.path('id', params.id, {});
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

ingredientsControllerPatch.PATH = '/api/ingredient/{id}';
