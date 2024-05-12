import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { inject, Injectable } from '@angular/core';
import { IngredientsService } from '@bakery-information-system/web/api-client';
import { delay, map, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IngredientsValidators {
  private readonly _api = inject(IngredientsService);

  public checkUniqueArticle(): AsyncValidatorFn {
    let defaultArticle: string | null = null;

    return (control: AbstractControl<string>) => {
      if (!defaultArticle) {
        defaultArticle = control.value;
      }

      return of(control.value).pipe(
        delay(600),
        map((article) => article.trim()),
        switchMap((article) => {
          if (defaultArticle === article) {
            return of(null);
          }

          return this._api
            .ingredientsControllerCheckUniqueArticle({ article })
            .pipe(
              map((response) =>
                response.success ? null : { articleInvalid: response.success }
              )
            );
        })
      );
    };
  }
}
