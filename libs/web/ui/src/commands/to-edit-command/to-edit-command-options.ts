import { Type } from '@angular/core';
import { ToEditCommandStrategies } from './enums';

export interface ToEditCommandOptions {
  component?: Type<unknown>;
  strategy: ToEditCommandStrategies;
}
