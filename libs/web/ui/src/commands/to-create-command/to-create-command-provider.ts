import { Provider } from '@angular/core';
import { ToCreateCommandOptions } from './to-create-command-options';
import { TO_CREATE_COMMAND_TOKEN } from './to-create-comman.token';
import { ToCreateCommand } from './to-create-command';
import { ToCreateCommandStrategies } from './enums';
import { ToCreateModalStrategy } from './strategies';

export function provideToCreateCommand(
  options?: Partial<ToCreateCommandOptions>
): Provider[] {
  return [
    {
      provide: TO_CREATE_COMMAND_TOKEN,
      useValue: {
        component: options?.component,
        strategy: options?.strategy || ToCreateCommandStrategies.Modal,
      } as ToCreateCommandOptions,
    },
    ToCreateModalStrategy,
    ToCreateCommand,
  ];
}
