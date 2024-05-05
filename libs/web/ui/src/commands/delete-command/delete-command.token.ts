import { InjectionToken } from '@angular/core';
import { ConfirmOptions } from '../confirm-command';

export const DELETE_COMMAND_TOKEN = new InjectionToken<ConfirmOptions<unknown>>(
  'delete command'
);
