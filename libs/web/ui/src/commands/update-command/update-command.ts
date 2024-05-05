import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { TuiDialogService } from '@taiga-ui/core';
import { ActionType } from '@ngxs/store/src/actions/symbols';
import { AbstractCommand, CommandAppearance } from '../../abstract';

export interface UpdateOptions<TParams> {
  label: (params: TParams) => string;
  action: ActionType;
  description?: (params: TParams) => string;
}

@Injectable()
export class UpdateCommand<TParams> extends AbstractCommand<TParams> {
  private readonly _store = inject(Store);
  private readonly _dialogService = inject(TuiDialogService);

  appearance(): CommandAppearance {
    return {
      label: 'Обновить',
      icon: 'tuiIconSave',
    };
  }

  execute(params: TParams): void {}
}
