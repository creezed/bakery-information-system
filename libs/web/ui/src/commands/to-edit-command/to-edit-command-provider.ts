import { Provider } from '@angular/core';
import { ToEditCommandOptions } from './to-edit-command-options';
import { ToEditCommand } from './to-edit-command';
import { ToEditCommandStrategies } from './enums';
import { TO_EDIT_COMMAND_TOKEN } from './to-edit-comman.token';
import { ToEditModalStrategy } from './strategies';
import { ToEditPageDetailStrategy } from './strategies/to-page-detail-strategy';

export function provideToEditCommand(
  options?: Partial<ToEditCommandOptions>
): Provider[] {
  return [
    {
      provide: TO_EDIT_COMMAND_TOKEN,
      useValue: {
        component: options?.component,
        strategy: options?.strategy || ToEditCommandStrategies.PageDetail,
      } as ToEditCommandOptions,
    },
    ToEditModalStrategy,
    ToEditPageDetailStrategy,
    ToEditCommand,
  ];
}
