import {
  AbstractCommand,
  CommandAppearance,
} from '@bakery-information-system/ui';
import { inject, Injectable, INJECTOR } from '@angular/core';
import { Observable } from 'rxjs';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { UnitsCreateModalComponent } from '../../create-modal/units-create-modal.component';

@Injectable()
export class CreateCommand extends AbstractCommand {
  private readonly dialogs = inject(TuiDialogService);
  private readonly injector = inject(INJECTOR);

  private readonly dialog = this.dialogs.open<void>(
    new PolymorpheusComponent(UnitsCreateModalComponent, this.injector),
    {
      dismissible: true,
    }
  );

  appearance(): CommandAppearance {
    return {
      label: 'Создать',
      icon: 'tuiIconPlus',
    };
  }

  command(): void | Observable<void> {
    return this.dialog;
  }
}
