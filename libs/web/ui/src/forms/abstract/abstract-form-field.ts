import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  NgControl,
} from '@angular/forms';
import { Directive, inject, OnInit } from '@angular/core';

@Directive()
export abstract class AbstractFormField
  implements OnInit, ControlValueAccessor
{
  private readonly ngControl = inject(NgControl, {
    optional: true,
    self: true,
  });

  public control!: FormControl;

  public constructor() {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  public writeValue(value: unknown): void {
    // empty
  }

  public registerOnChange(fn: (_: unknown) => void): void {
    // empty
  }

  public registerOnTouched(fn: unknown): void {
    // empty
  }

  public ngOnInit(): void {
    if (!this.ngControl) {
      throw new Error('ngControl is undefined');
    }

    if (
      this.ngControl instanceof FormControlName ||
      this.ngControl instanceof FormControlDirective
    ) {
      this.control = this.ngControl.control;
    }
  }
}
