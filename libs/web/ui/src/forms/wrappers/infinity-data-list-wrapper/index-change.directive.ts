import { Directive, inject, Output } from '@angular/core';
import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';

@Directive({
  selector: '[uiIndexChange]',
  standalone: true,
})
export class IndexChangeDirective {
  @Output()
  readonly uiIndexChange = inject(VIRTUAL_SCROLL_STRATEGY).scrolledIndexChange;
}
