import { inject, Injectable } from '@angular/core';
import { take } from 'rxjs';
import { ActionType } from '@ngxs/store/src/actions/symbols';
import { Store } from '@ngxs/store';
import { TuiDialogService } from '@taiga-ui/core';
import { AbstractCommand, CommandAppearance } from '../../abstract';
import { DIALOG_CONFIRM } from '../../components';
import { actionIsLoading } from '../../ngxs';
import { DELETE_COMMAND_OPTIONS } from './delete-command-options';

export interface DeleteOptions<TParams> {
  label: (params: TParams) => string;
  action: ActionType;
  description?: (params: TParams) => string;
}

@Injectable()
export class DeleteCommand<TParams> extends AbstractCommand<TParams> {
  private readonly _store = inject(Store);
  private readonly _dialogService = inject(TuiDialogService);
  private readonly options = inject(DELETE_COMMAND_OPTIONS);
  private readonly DeleteAction: any = this.options.action;
  private readonly isLoading$ = actionIsLoading(this.DeleteAction);

  appearance(): CommandAppearance {
    return {
      label: 'Удалить',
      icon: 'tuiIconTrash',
    };
  }

  execute(params: TParams): void {
    const { label, description } = this.options;
    const { DeleteAction } = this;

    this._dialogService
      .open<boolean>(DIALOG_CONFIRM, {
        size: 'auto',
        data: {
          label: label(params),
          description: description?.(params),
          yesClick: () => this._store.dispatch(new DeleteAction(params)),
          isLoading$: this.isLoading$,
          yes: 'Удалить',
          no: 'Отмена',
        },
      })
      .pipe(take(1))
      .subscribe();
  }
}
