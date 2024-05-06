import { Routes } from '@angular/router';
import { provideRoutePage } from '@bakery-information-system/web/ui';
import { importProvidersFrom } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { UnitsState } from './state';

export const ROUTES: Routes = [
  {
    providers: [importProvidersFrom(NgxsModule.forFeature([UnitsState]))],
    ...provideRoutePage({
      path: '',
      loadComponent: () =>
        import('./units.component').then((c) => c.UnitsComponent),
    }),
  },
];
