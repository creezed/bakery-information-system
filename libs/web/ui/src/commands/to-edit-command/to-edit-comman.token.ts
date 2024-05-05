import { InjectionToken } from '@angular/core';
import { ToEditCommandOptions } from './to-edit-command-options';

export const TO_EDIT_COMMAND_TOKEN = new InjectionToken<ToEditCommandOptions>(
  'to edit command'
);
