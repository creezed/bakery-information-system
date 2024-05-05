import { inject, Injectable } from '@angular/core';
import { AbstractToEditStrategy } from '../abstract';
import { PageDetailsService } from '../../../components';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { take } from 'rxjs';
import { TO_EDIT_COMMAND_TOKEN } from '../to-edit-comman.token';

@Injectable()
export class ToEditPageDetailStrategy<
  TParams
> extends AbstractToEditStrategy<TParams> {
  private readonly options = inject(TO_EDIT_COMMAND_TOKEN);
  private readonly _pageDetailsService = inject(PageDetailsService);

  public override open(params: TParams): void {
    if (!this.options.component) {
      throw new Error('Нужен компонент!!!!');
    }

    this._pageDetailsService
      .open({
        content: new PolymorpheusComponent(this.options.component),
        data: params,
      })
      .pipe(take(1))
      .subscribe();
  }
}
