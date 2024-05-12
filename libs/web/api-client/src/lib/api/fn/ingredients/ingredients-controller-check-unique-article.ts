/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CheckUniqueModel } from '../../models/check-unique-model';

export interface IngredientsControllerCheckUniqueArticle$Params {
  article: string;
}

export function ingredientsControllerCheckUniqueArticle(http: HttpClient, rootUrl: string, params: IngredientsControllerCheckUniqueArticle$Params, context?: HttpContext): Observable<StrictHttpResponse<CheckUniqueModel>> {
  const rb = new RequestBuilder(rootUrl, ingredientsControllerCheckUniqueArticle.PATH, 'get');
  if (params) {
    rb.path('article', params.article, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CheckUniqueModel>;
    })
  );
}

ingredientsControllerCheckUniqueArticle.PATH = '/api/ingredient/check-unique/{article}';
