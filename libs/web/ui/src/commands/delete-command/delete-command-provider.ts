import { ActionType } from '@ngxs/store/src/actions/symbols';
import { Provider } from '@angular/core';
import { DELETE_COMMAND_TOKEN } from './delete-command.token';
import { ConfirmOptions } from '../confirm-command';
import { DeleteCommand } from './delete-command';

interface DeleteOptions<TParams> {
  label: (params: TParams) => string;
  description: (params: TParams) => string;
  yesText: string;
  noText: string;
}

export function provideDeleteCommand<TParams = unknown>(
  action: ActionType,
  options?: Partial<DeleteOptions<TParams>>
): Provider[] {
  return [
    {
      provide: DELETE_COMMAND_TOKEN,
      useValue: {
        label: options?.label ? options.label : () => `Удалить?`,
        description: options?.description,
        action: action,
        appearance: {
          label: 'Удалить',
          icon: 'icons8::trash',
        },
        yesText: options?.yesText || 'Удалить',
        noText: options?.noText || 'Отменить',
      } as ConfirmOptions<TParams>,
    },
    DeleteCommand,
  ];
}
