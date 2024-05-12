import { Component, inject, Input } from '@angular/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { OPTION_LABEL_PROVIDER } from '../../tokens';
import { TuiItemsHandlers } from '@taiga-ui/kit/tokens';

export type DefaultOptionItem<T> = T & {
  label: string;
};

@Component({
  selector: 'ui-option-default-template',
  standalone: true,
  templateUrl: './option-default-template.component.html',
})
export class OptionDefaultTemplateComponent<T> {
  private readonly optionLabelProviderRef = inject<{
    labelFormatter: TuiItemsHandlers<T>['stringify'];
  }>(OPTION_LABEL_PROVIDER, { optional: true });

  private readonly context = inject<{
    $implicit: DefaultOptionItem<any>;
    active: boolean;
  }>(POLYMORPHEUS_CONTEXT, { optional: true });

  @Input()
  public label?: string;

  @Input()
  public hint?: string;

  protected get innerLabel(): string {
    return (
      (this.optionLabelProviderRef &&
        this.optionLabelProviderRef.labelFormatter &&
        this.optionLabelProviderRef.labelFormatter(this.context?.$implicit)) ||
      this.context?.$implicit?.label ||
      this.label ||
      '-'
    );
  }
}
