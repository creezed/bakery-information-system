import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({ selector: '[uiPageDetailActions]', standalone: true })
export class PageDetailActionsDirective {
  public template = inject(TemplateRef);
}
