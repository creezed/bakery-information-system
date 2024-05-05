import { Route } from '@angular/router';

interface Options {
  path?: string;
  title?: string;
  loadComponent?: Route['loadComponent'];
  loadChildren?: Route['loadChildren'];
}

export function provideRoutePage({
  path,
  title,
  loadComponent,
  loadChildren,
}: Options = {}): Route {
  return {
    path,
    loadComponent,
    loadChildren,
    data: { title },
    ...(!loadChildren ? { children: [{ path: ':tab', loadComponent }] } : {}),
  };
}
