import { InjectionToken } from '@angular/core';
import { ToCreateCommandOptions } from './to-create-command-options';

export const TO_CREATE_COMMAND_TOKEN =
  new InjectionToken<ToCreateCommandOptions>('to create command');
