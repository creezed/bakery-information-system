import { inject, Injectable } from '@angular/core';
import { AbstractCommand, CommandAppearance } from '../../abstract';
import { TO_EDIT_COMMAND_TOKEN } from './to-edit-comman.token';
import { ToEditCommandStrategies } from './enums';
import { ToEditModalStrategy } from './strategies';
import { ToEditPageDetailStrategy } from './strategies/to-page-detail-strategy';

@Injectable()
export class ToEditCommand<TParams> extends AbstractCommand<TParams> {
  private readonly options = inject(TO_EDIT_COMMAND_TOKEN);
  private readonly modalStrategy = inject(ToEditModalStrategy);
  private readonly pageDetailStrategy = inject(ToEditPageDetailStrategy);

  public get appearance(): CommandAppearance {
    return {
      label: 'Редактивать',
      icon: 'icons8::edit-row',
    };
  }

  public execute(params: TParams): void {
    if (this.options.strategy === ToEditCommandStrategies.Modal) {
      this.modalStrategy.open(params);
    }
    if (this.options.strategy === ToEditCommandStrategies.PageDetail) {
      this.pageDetailStrategy.open(params);
    }
  }
}
