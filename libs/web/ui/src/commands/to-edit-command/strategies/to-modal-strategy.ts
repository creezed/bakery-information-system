import { inject, Injectable, INJECTOR } from '@angular/core';
import { AbstractToEditStrategy } from '../abstract';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { take } from 'rxjs';
import { TO_EDIT_COMMAND_TOKEN } from '../to-edit-comman.token';

@Injectable()
export class ToEditModalStrategy<
  TParams
> extends AbstractToEditStrategy<TParams> {
  private readonly options = inject(TO_EDIT_COMMAND_TOKEN);
  private readonly dialogs = inject(TuiDialogService);
  private readonly injector = inject(INJECTOR);

  public override open(params: TParams): void {
    if (!this.options.component) {
      throw new Error('Нужен компонент!!!!');
    }

    this.dialogs
      .open(new PolymorpheusComponent(this.options.component, this.injector), {
        data: params,
      })
      .pipe(take(1))
      .subscribe();
  }
}
