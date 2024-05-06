import { Routes } from '@angular/router';
import { provideRoutePage } from '@bakery-information-system/web/ui';
import { importProvidersFrom } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { StocksState } from './state';

export const ROUTES: Routes = [
  {
    providers: [importProvidersFrom(NgxsModule.forFeature([StocksState]))],
    ...provideRoutePage({
      path: '',
      loadComponent: () =>
        import('./stocks.component').then((c) => c.StocksComponent),
    }),
  },
];
