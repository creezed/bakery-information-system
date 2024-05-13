import { InjectionToken, Provider } from '@angular/core';
import { filter, Observable, of, switchMap } from 'rxjs';
import { Supplier } from '../models';
import { Store } from '@ngxs/store';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { TuiDialogContext } from '@taiga-ui/core';
import { LoadSupplier } from '../state';
import { SuppliersStateSelectors } from '../state/suppliers-state.selectors';

export const SUPPLIER_INFO = new InjectionToken<Observable<Supplier>>(
  'supplier info'
);

export const SUPPLIER_EDIT_PROVIDERS: Provider[] = [
  {
    provide: SUPPLIER_INFO,
    deps: [Store, POLYMORPHEUS_CONTEXT],
    useFactory: supplierInfoFactory,
  },
  {
    provide: TUI_VALIDATION_ERRORS,
    useValue: {
      required: 'Обязательное поле',
      email: 'Неверный формат почты',
    },
  },
];

function supplierInfoFactory(
  store: Store,
  context: TuiDialogContext<boolean, Supplier>
) {
  return of(context.data).pipe(
    switchMap((supplier) =>
      store
        .dispatch(new LoadSupplier({ id: supplier.id }))
        .pipe(
          switchMap(() =>
            store.select(SuppliersStateSelectors.supplier).pipe(filter(Boolean))
          )
        )
    )
  );
}
