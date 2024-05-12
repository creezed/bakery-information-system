import {
  AbstractCommand,
  CommandAppearance,
} from '@bakery-information-system/web/ui';
import { inject, Injectable } from '@angular/core';
import { CreateIngredientModel } from '../../models';
import { Store } from '@ngxs/store';
import { CreateIngredient } from '../../state';

@Injectable({ providedIn: 'root' })
export class IngredientCreateCommand extends AbstractCommand<CreateIngredientModel> {
  private readonly store = inject(Store);

  get appearance(): CommandAppearance {
    return {
      icon: '',
      label: '',
    };
  }

  public execute(params: CreateIngredientModel): void {
    this.store.dispatch(new CreateIngredient({ model: params }));
  }
}
