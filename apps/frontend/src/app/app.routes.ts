import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { NgxsModule } from '@ngxs/store';
import { UnitsState } from './сatalogs/units/state';
import { importProvidersFrom } from '@angular/core';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    providers: [importProvidersFrom(NgxsModule.forFeature([UnitsState]))],
    children: [
      {
        path: 'units',
        loadChildren: () =>
          import('./сatalogs/units/units.routes').then((r) => r.ROUTES),
      },
    ],
  },
];
