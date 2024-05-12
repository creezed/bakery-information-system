import { defer, map, Observable, startWith, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { Actions, ofActionDispatched, ofActionSuccessful } from '@ngxs/store';
import { ActionType } from '@ngxs/store/src/actions/symbols';
import { tuiIsFalsy } from '@taiga-ui/cdk';

export function actionIsLoading(action: ActionType): Observable<boolean> {
  const actions$ = inject(Actions);
  const trigger$ = defer(() => actions$.pipe(ofActionDispatched(action)));

  return trigger$.pipe(
    switchMap(() =>
      actions$
        .pipe(ofActionSuccessful(action))
        .pipe(map(tuiIsFalsy), startWith(true))
    )
  );
}
