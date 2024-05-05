import { Directive, inject, Input, TemplateRef } from '@angular/core';

@Directive({ selector: '[uiPageDetailTab]', standalone: true })
export class PageDetailTabDirective {
  @Input()
  public uiPageDetailTab = '';

  public readonly template = inject(TemplateRef);
}
