import { Directive, inject, Input, TemplateRef } from '@angular/core';

@Directive({ selector: '[uiPageTab]', standalone: true })
export class PageTabDirective {
  @Input()
  public uiPageTab?: string | '';

  public readonly template = inject(TemplateRef);
}
