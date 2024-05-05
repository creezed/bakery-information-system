import { inject, Injectable, INJECTOR } from '@angular/core';
import {
  AbstractCommand,
  CommandAppearance,
} from '@bakery-information-system/web/ui';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { UnitsCreateModalComponent } from '../../create-modal/units-create-modal.component';
import { take } from 'rxjs';

@Injectable()
export class UnitOpenCreateModalCommand extends AbstractCommand {
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

  execute(): void {
    this.dialog.pipe(take(1)).subscribe();
  }
}
