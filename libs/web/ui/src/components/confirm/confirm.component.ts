import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  POLYMORPHEUS_CONTEXT,
  PolymorpheusComponent,
} from '@tinkoff/ng-polymorpheus';
import { TuiButtonModule, TuiDialogContext } from '@taiga-ui/core';
import { TuiAutoFocusModule } from '@taiga-ui/cdk';
import { Observable, of, tap } from 'rxjs';

export interface DialogConfirmData {
  readonly label: string;
  readonly description?: string;
  readonly isLoading$?: Observable<boolean>;
  readonly yesClick?: VoidFunction;
  readonly no?: string;
  readonly yes?: string;
  readonly appearance?: string;
}

@Component({
  selector: 'ui-confirm',
  standalone: true,
  imports: [CommonModule, TuiButtonModule, TuiAutoFocusModule],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmComponent {
  protected readonly context =
    inject<TuiDialogContext<boolean, DialogConfirmData | undefined>>(
      POLYMORPHEUS_CONTEXT
    );

  private isLoading$ = this.context.data?.isLoading$ || of(false);

  protected click() {
    const yesClick = this.context.data?.yesClick;

    if (!yesClick) {
      return this.context.completeWith(true);
    }

    yesClick();
  }

  protected yesLoading$ = this.isLoading$.pipe(
    tap((isLoading) => {
      if (!isLoading) {
        return this.context.completeWith(true);
      }
    })
  );
}

export const DIALOG_CONFIRM = new PolymorpheusComponent(ConfirmComponent);
