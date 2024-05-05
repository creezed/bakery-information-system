import { inject, Injectable, INJECTOR } from '@angular/core';
import { AbstractToCreateStrategy } from '../abstract';
import { TO_CREATE_COMMAND_TOKEN } from '../to-create-comman.token';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { take } from 'rxjs';

@Injectable()
export class ToCreateModalStrategy extends AbstractToCreateStrategy {
  private readonly options = inject(TO_CREATE_COMMAND_TOKEN);
  private readonly dialogs = inject(TuiDialogService);
  private readonly injector = inject(INJECTOR);

  public override open(): void {
    if (!this.options.component) {
      throw new Error('Нужен компонент!!!!');
    }

    this.dialogs
      .open(new PolymorpheusComponent(this.options.component, this.injector))
      .pipe(take(1))
      .subscribe();
  }
}
