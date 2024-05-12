import {
  AbstractCommand,
  CommandAppearance,
} from '@bakery-information-system/web/ui';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { UpdateIngredientModel } from '../models';

@Injectable({ providedIn: 'root' })
export class IngredientCreateCommand extends AbstractCommand<UpdateIngredientModel> {
  private readonly store = inject(Store);

  get appearance(): CommandAppearance {
    return {
      icon: '',
      label: '',
    };
  }

  public execute(params: UpdateIngredientModel): void {}
}
