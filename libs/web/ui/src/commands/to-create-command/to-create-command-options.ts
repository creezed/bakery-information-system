import { Type } from '@angular/core';
import { ToCreateCommandStrategies } from './enums';

export interface ToCreateCommandOptions {
  component?: Type<unknown>;
  strategy: ToCreateCommandStrategies;
}
