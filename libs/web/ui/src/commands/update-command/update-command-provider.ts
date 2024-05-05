import { UPDATE_COMMAND_TOKEN } from './update-command.token';
import { Provider } from '@angular/core';
import { ConfirmOptions } from '../confirm-command';
import { ActionType } from '@ngxs/store/src/actions/symbols';
import { UpdateCommand } from './update-command';

interface UpdateOptions<TParams> {
  label: (params: TParams) => string;
  yesText: string;
  noText: string;
}

export function provideUpdateCommand<TParams = unknown>(
  action: ActionType,
  options?: Partial<UpdateOptions<TParams>>
): Provider[] {
  return [
    {
      provide: UPDATE_COMMAND_TOKEN,
      useValue: {
        label: options?.label ? options.label : () => `Сохранить изменения?`,
        action: action,
        appearance: {
          label: 'Сохранить',
          icon: 'icons8::save',
        },
        yesText: options?.yesText || 'Сохранить',
        noText: options?.noText || 'Отменить',
      } as ConfirmOptions<TParams>,
    },
    UpdateCommand,
  ];
}
