import { Routes } from '@angular/router';
import { provideRoutePage } from '@bakery-information-system/web/ui';

export const ROUTES: Routes = [
  provideRoutePage({
    path: '',
    loadComponent: () =>
      import('./units.component').then((c) => c.UnitsComponent),
  }),
];
