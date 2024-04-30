import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({ selector: '[uiPageActions]', standalone: true })
export class PageActionsDirective {
  public readonly template = inject(TemplateRef);
}
