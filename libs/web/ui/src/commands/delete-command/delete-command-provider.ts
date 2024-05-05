import { DeleteCommand, DeleteOptions } from './delete-command';
import { Provider, Type } from '@angular/core';
import { DELETE_COMMAND_OPTIONS } from './delete-command-options';

export function provideDeleteCommand<TParams = unknown>(
  command: Type<DeleteCommand<TParams>>,
  options: DeleteOptions<TParams>
): Provider[] {
  return [
    {
      provide: DELETE_COMMAND_OPTIONS,
      useValue: options,
    },
    command,
  ];
}
