import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractTuiDataListWrapper, TUI_ITEMS_HANDLERS } from '@taiga-ui/kit';
import {
  TEXTFIELD_CONTROLLER_PROVIDER,
  TUI_TEXTFIELD_WATCHED_CONTROLLER,
  tuiAsDataListAccessor,
  TuiDataListModule,
  TuiLoaderModule,
  TuiScrollbarModule,
} from '@taiga-ui/core';
import { TuiElementModule } from '@taiga-ui/cdk';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { IndexChangeDirective } from './index-change.directive';
import { ReplaySubject } from 'rxjs';
import { LoadTriggerDirective } from './load-trigger.directive';

@Component({
  selector: 'ui-infinity-data-list-wrapper',
  standalone: true,
  imports: [
    CommonModule,
    TuiDataListModule,
    TuiElementModule,
    PolymorpheusModule,
    TuiLoaderModule,
    CdkVirtualScrollViewport,
    TuiScrollbarModule,
    CdkFixedSizeVirtualScroll,
    IndexChangeDirective,
    CdkVirtualForOf,
    LoadTriggerDirective,
  ],
  templateUrl: './infinity-data-list-wrapper.component.html',
  styleUrl: './infinity-data-list-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiAsDataListAccessor(InfinityDataListWrapperComponent),
    TEXTFIELD_CONTROLLER_PROVIDER,
  ],
})
export class InfinityDataListWrapperComponent<
  T
> extends AbstractTuiDataListWrapper<T> {
  @Input()
  public items: readonly T[] | null = [];

  @Output()
  public readonly scrolled = new ReplaySubject<void>();

  constructor() {
    super(
      inject(TUI_ITEMS_HANDLERS),
      inject(TUI_TEXTFIELD_WATCHED_CONTROLLER, { optional: true })?.size || 'm'
    );
  }
}
