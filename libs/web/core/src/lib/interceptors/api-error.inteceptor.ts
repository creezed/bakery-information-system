import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';
import { getApiError } from '../utils';

export const apiErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const alertService = inject(TuiAlertService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      switch (err.status) {
        case 400:
          alertService
            .open(getApiError(err), { label: 'Ошибка', status: 'error' })
            .subscribe();
          break;
      }

      return throwError(() => req);
    })
  );
};
