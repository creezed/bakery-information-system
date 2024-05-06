import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { NgxsModule } from '@ngxs/store';
import { importProvidersFrom } from '@angular/core';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    providers: [importProvidersFrom(NgxsModule.forRoot())],
    children: [
      {
        path: 'units',
        loadChildren: () =>
          import('./сatalogs/units/units.routes').then((r) => r.ROUTES),
      },
      {
        path: 'stocks',
        loadChildren: () =>
          import('./enterprise/stocks/stocks.routes').then((r) => r.ROUTES),
      },
    ],
  },
];
