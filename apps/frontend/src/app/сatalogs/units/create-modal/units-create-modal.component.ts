import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiButtonModule,
  TuiDialogContext,
  TuiErrorModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import {
  TUI_VALIDATION_ERRORS,
  TuiFieldErrorPipeModule,
  TuiInputModule,
} from '@taiga-ui/kit';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-units-create-modal',
  standalone: true,
  imports: [
    CommonModule,
    TuiInputModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiButtonModule,
  ],
  templateUrl: './units-create-modal.component.html',
  styleUrl: './units-create-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Обязательное поле',
      },
    },
  ],
})
export class UnitsCreateModalComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly context =
    inject<TuiDialogContext<number, number>>(POLYMORPHEUS_CONTEXT);

  protected form = this.formBuilder.group({
    code: this.formBuilder.control(null, { validators: [Validators.required] }),
    name: this.formBuilder.control(null, { validators: [Validators.required] }),
    fullName: this.formBuilder.control(null, {
      validators: [Validators.required],
    }),
  });

  protected get data() {
    return this.context.data;
  }

  protected submit() {
    this.context.completeWith(12);
  }
}
