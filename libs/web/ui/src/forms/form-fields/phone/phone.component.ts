import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractFormField } from '../../abstract';
import { TuiFieldErrorPipeModule, TuiInputPhoneModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiErrorModule } from '@taiga-ui/core';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'ui-phone',
  standalone: true,
  templateUrl: './phone.component.html',
  styleUrl: './phone.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TuiInputPhoneModule,
    ReactiveFormsModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    AsyncPipe,
  ],
})
export class PhoneComponent extends AbstractFormField {}
