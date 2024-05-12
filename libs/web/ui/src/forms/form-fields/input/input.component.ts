import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractFormField } from '../../abstract';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiErrorModule,
  TuiLoaderModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiFieldErrorPipeModule, TuiInputModule } from '@taiga-ui/kit';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import { defer, map } from 'rxjs';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiLoaderModule,
    TuiSvgModule,
    PolymorpheusModule,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent extends AbstractFormField {
  @Input()
  public statusIcons = false;

  @ViewChild('pending', { static: true, read: TemplateRef })
  private pendingTemplate!: TemplateRef<unknown>;

  @ViewChild('valid', { static: true, read: TemplateRef })
  private validTemplate!: TemplateRef<unknown>;

  @Input()
  public statusIconShow = false;

  protected statusIcon$ = defer(() =>
    this.control.statusChanges.pipe(
      map((status) => {
        if (status === 'PENDING') {
          return this.pendingTemplate;
        }

        if (status === 'VALID') {
          return this.validTemplate;
        }

        return null;
      })
    )
  );
}
