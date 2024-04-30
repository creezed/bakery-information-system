import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { provideRoutePage } from '@bakery-information-system/ui';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      provideRoutePage({
        path: 'ingredients',
        loadComponent: () =>
          import(
            './nomenclature/Ingredients/nomenclature-Ingredients.component'
          ).then((c) => c.NomenclatureIngredientsComponent),
      }),
      provideRoutePage({
        path: 'units',
        loadComponent: async () =>
          (await import('./сatalogs/units/units.component')).UnitsComponent,
      }),
    ],
  },
];
