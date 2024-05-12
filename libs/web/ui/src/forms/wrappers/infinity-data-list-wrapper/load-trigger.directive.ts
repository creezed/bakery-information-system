import { Directive, EventEmitter, OnInit, Output } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ui-load-trigger',
  exportAs: 'load-trigger',
  standalone: true,
})
export class LoadTriggerDirective implements OnInit {
  @Output()
  public readonly init = new EventEmitter();

  public ngOnInit(): void {
    this.init.emit();
  }
}
