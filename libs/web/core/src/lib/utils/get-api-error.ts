import { HttpErrorResponse } from '@angular/common/http';

export function getApiError(errorResponse: HttpErrorResponse): string {
  if (!errorResponse.error.message) {
    return 'Неизвестная ошибка';
  }
  const { message } = errorResponse.error;

  if (typeof message === 'string') {
    return message;
  }

  if (Array.isArray(message)) {
    return message.reduce(
      (previousValue, currentValue) => previousValue + currentValue + '\n',
      ''
    );
  }

  return 'Неизвестная ошибка';
}
