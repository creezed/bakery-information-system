import { InjectionToken } from '@angular/core';
import { UpdateOptions } from './update-command';

export const UPDATE_COMMAND_OPTIONS = new InjectionToken<
  UpdateOptions<unknown>
>('');
