import { InjectionToken } from '@angular/core';
import { ConfirmOptions } from '../commands';

export const TO_EDIT_COMMAND_TOKEN = new InjectionToken<
  ConfirmOptions<unknown>
>('to edit command');
