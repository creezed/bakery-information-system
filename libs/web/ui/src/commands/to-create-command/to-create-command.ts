import { inject, Injectable } from '@angular/core';
import { AbstractCommand, CommandAppearance } from '../../abstract';
import { TO_CREATE_COMMAND_TOKEN } from './to-create-comman.token';
import { ToCreateCommandStrategies } from './enums';
import { ToCreateModalStrategy } from './strategies';

@Injectable()
export class ToCreateCommand extends AbstractCommand {
  private readonly options = inject(TO_CREATE_COMMAND_TOKEN);
  private readonly modalStrategy = inject(ToCreateModalStrategy);

  public get appearance(): CommandAppearance {
    return {
      label: 'Создать',
      icon: 'tuiIconPlus',
    };
  }

  public execute(): void {
    if (this.options.strategy === ToCreateCommandStrategies.Modal) {
      this.modalStrategy.open();
    }
  }
}
