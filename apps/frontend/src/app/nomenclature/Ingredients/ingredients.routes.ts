import { Routes } from '@angular/router';
import { provideRoutePage } from '@bakery-information-system/web/ui';
import { importProvidersFrom } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { IngredientsState } from './state';

export const ROUTES: Routes = [
  {
    providers: [importProvidersFrom(NgxsModule.forFeature([IngredientsState]))],
    ...provideRoutePage({
      path: '',
      loadComponent: () =>
        import('./nomenclature-Ingredients.component').then(
          (c) => c.NomenclatureIngredientsComponent
        ),
    }),
  },
];
