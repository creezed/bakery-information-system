import { Provider, Type } from '@angular/core';
import { UpdateCommand, UpdateOptions } from './update-command';
import { UPDATE_COMMAND_OPTIONS } from './update-command-options';

export function provideUpdateCommand<TParams = unknown>(
  command: Type<UpdateCommand<TParams>>,
  options: UpdateOptions<TParams>
): Provider[] {
  return [
    {
      provide: UPDATE_COMMAND_OPTIONS,
      useValue: options,
    },
    command,
  ];
}
