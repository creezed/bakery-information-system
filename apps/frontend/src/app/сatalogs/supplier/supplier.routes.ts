import { Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SuppliersState } from './state';
import { provideRoutePage } from '@bakery-information-system/web/ui';

export const ROUTES: Routes = [
  {
    providers: [importProvidersFrom(NgxsModule.forFeature([SuppliersState]))],
    ...provideRoutePage({
      path: '',
      loadComponent: () =>
        import('./supplier.component').then((c) => c.SupplierComponent),
    }),
  },
];
