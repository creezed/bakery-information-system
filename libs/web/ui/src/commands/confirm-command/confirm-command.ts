import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { TuiDialogService } from '@taiga-ui/core';
import { ActionType } from '@ngxs/store/src/actions/symbols';
import { AbstractCommand, CommandAppearance } from '../../abstract';
import { Observable, take } from 'rxjs';
import { actionIsLoading } from '../../ngxs';
import { DIALOG_CONFIRM } from '../../components';

export interface ConfirmOptions<TParams> {
  label: (params: TParams) => string;
  action: ActionType;
  appearance: CommandAppearance;
  description?: (params: TParams) => string;
  yesText?: string;
  noText?: string;
}

@Injectable()
export abstract class ConfirmCommand<TParams> extends AbstractCommand<TParams> {
  private readonly _store = inject(Store);
  private readonly _dialogService = inject(TuiDialogService);
  private readonly _options: ConfirmOptions<TParams>;
  private readonly Action: any;
  private readonly isLoading$: Observable<boolean>;

  protected constructor(protected readonly options: ConfirmOptions<TParams>) {
    super();
    this._options = options;
    this.Action = this._options.action;
    this.isLoading$ = actionIsLoading(this.Action);
  }

  get appearance(): CommandAppearance {
    return this._options.appearance;
  }

  execute(params: TParams): void {
    const { label, description, yesText, noText } = this._options;
    const { Action } = this;

    this._dialogService
      .open<boolean>(DIALOG_CONFIRM, {
        size: 's',
        data: {
          label: label(params),
          description: description?.(params),
          yesClick: () => this._store.dispatch(new Action(params)),
          isLoading$: this.isLoading$,
          yes: yesText,
          no: noText,
        },
      })
      .pipe(take(1))
      .subscribe();
  }
}
