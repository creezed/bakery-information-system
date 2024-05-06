import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiBlockStatusModule } from '@taiga-ui/layout';
import { EMPTY_GUARD_OPTIONS } from './empty-guard-options';
import { TuiButtonModule } from '@taiga-ui/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'ui-page-empty-guard',
  standalone: true,
  imports: [
    CommonModule,
    TuiBlockStatusModule,
    TuiButtonModule,
    LottieComponent,
  ],
  templateUrl: './empty-guard.component.html',
  styleUrl: './empty-guard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyGuardComponent {
  protected readonly options = inject(EMPTY_GUARD_OPTIONS);

  @Input({
    required: true,
  })
  public data!: unknown[] | number | string;

  @Input()
  public buttonClick?: VoidFunction;

  protected lottieOptions: AnimationOptions = {
    path: this.options.lottieSrc,
  };

  protected get isEmpty(): boolean {
    if (!this.data) {
      return true;
    }

    if (Array.isArray(this.data)) {
      return !(this.data.length > 0);
    }

    return false;
  }

  protected click(): void {
    this.buttonClick?.();
  }
}
