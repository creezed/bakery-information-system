import { inject, Injectable } from '@angular/core';
import {
  AbstractCommand,
  CommandAppearance,
  PageDetailsService,
} from '@bakery-information-system/web/ui';
import { Unit } from '../../models/unit.model';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { UnitsDetailsComponent } from '../../details/units-details.component';
import { take } from 'rxjs';

@Injectable()
export class ToUpdateCommand extends AbstractCommand<Unit> {
  private readonly _pageDetailsService = inject(PageDetailsService);
  public appearance(): CommandAppearance {
    return {
      label: 'Редактирование',
      icon: 'tuiIconEdit2',
    };
  }

  execute(params: Unit): void {
    this._pageDetailsService
      .open({
        content: new PolymorpheusComponent(UnitsDetailsComponent),
        data: params,
      })
      .pipe(take(1))
      .subscribe();
  }
}
