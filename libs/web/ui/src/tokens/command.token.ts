import { InjectionToken } from '@angular/core';
import { AbstractCommand } from '../abstract';

export const COMMANDS_TOKEN = new InjectionToken<
  ReadonlyArray<AbstractCommand>
>('commands');
