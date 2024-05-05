import { InjectionToken } from '@angular/core';
import { ConfirmOptions } from '../commands';

export const TO_CREATE_COMMAND_TOKEN = new InjectionToken<
  ConfirmOptions<unknown>
>('update command');
