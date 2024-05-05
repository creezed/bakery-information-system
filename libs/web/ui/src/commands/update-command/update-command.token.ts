import { InjectionToken } from '@angular/core';
import { ConfirmOptions } from '../confirm-command';

export const UPDATE_COMMAND_TOKEN = new InjectionToken<ConfirmOptions<unknown>>(
  'update command'
);
