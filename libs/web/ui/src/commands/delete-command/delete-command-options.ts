import { InjectionToken } from '@angular/core';
import { DeleteOptions } from './delete-command';

export const DELETE_COMMAND_OPTIONS = new InjectionToken<
  DeleteOptions<unknown>
>('');
