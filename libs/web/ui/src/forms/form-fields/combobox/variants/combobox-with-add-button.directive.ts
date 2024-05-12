import { Directive, inject, Output } from '@angular/core';
import { ComboboxComponent } from '../combobox.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Subject } from 'rxjs';
import { ComboboxWithAddButtonTemplateComponent } from '../templates/with-add-button/combobox-with-add-button-template.component';

@Directive({ selector: '[uiComboboxWithAddButton]', standalone: true })
export class ComboboxWithAddButtonDirective {
  private readonly host = inject(ComboboxComponent);

  @Output()
  public addClicked = new Subject<void>();

  public constructor() {
    this.host.dropdownHeader = new PolymorpheusComponent(
      ComboboxWithAddButtonTemplateComponent
    );
  }

  public addClick(): void {
    this.addClicked.next();
  }
}
