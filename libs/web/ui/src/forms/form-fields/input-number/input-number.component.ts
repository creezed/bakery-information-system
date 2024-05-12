import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractFormField } from '../../abstract';
import { TuiFieldErrorPipeModule, TuiInputNumberModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiErrorModule, TuiTextfieldControllerModule } from '@taiga-ui/core';

@Component({
  selector: 'ui-input-number',
  standalone: true,
  imports: [
    CommonModule,
    TuiInputNumberModule,
    ReactiveFormsModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberComponent extends AbstractFormField {}
