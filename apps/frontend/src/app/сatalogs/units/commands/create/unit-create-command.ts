import {
  AbstractCommand,
  CommandAppearance,
} from '@bakery-information-system/web/ui';
import { inject, Injectable } from '@angular/core';
import { CreateUnitModel } from '../../models/create-unit.model';
import { Store } from '@ngxs/store';
import { CreateUnit } from '../../state';

@Injectable()
export class UnitCreateCommand extends AbstractCommand<CreateUnitModel> {
  private readonly _store = inject(Store);

  appearance(): CommandAppearance {
    return {
      label: 'Создать',
      icon: 'tuiIconPlus',
    };
  }

  execute(model: CreateUnitModel): void {
    this._store.dispatch(new CreateUnit({ model }));
  }
}
