import { InjectionToken, Provider } from '@angular/core';
import { filter, Observable, of, switchMap } from 'rxjs';
import { Ingredient } from '../models';
import { Store } from '@ngxs/store';
import { TuiDialogContext } from '@taiga-ui/core';
import { LoadIngredient } from '../state';
import { IngredientsStateSelectors } from '../state/ingredients-state.selectors';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { IngredientsFormsService } from '../services';

export const INGREDIENT_INFO = new InjectionToken<Observable<Ingredient>>(
  'ingredient info'
);

export const INGREDIENT_EDIT_PROVIDERS: Provider[] = [
  {
    provide: INGREDIENT_INFO,
    deps: [Store, POLYMORPHEUS_CONTEXT],
    useFactory: ingredientInfoFactory,
  },
  {
    provide: TUI_VALIDATION_ERRORS,
    useValue: {
      required: 'Обязательное поле',
      articleInvalid: 'Артикул ингредиента уже используется в системе',
    },
  },
  IngredientsFormsService,
];

function ingredientInfoFactory(
  store: Store,
  context: TuiDialogContext<boolean, Ingredient>
) {
  return of(context.data).pipe(
    switchMap((ingredient) =>
      store
        .dispatch(new LoadIngredient({ id: ingredient.id }))
        .pipe(
          switchMap(() =>
            store
              .select(IngredientsStateSelectors.ingredient)
              .pipe(filter(Boolean))
          )
        )
    )
  );
}
