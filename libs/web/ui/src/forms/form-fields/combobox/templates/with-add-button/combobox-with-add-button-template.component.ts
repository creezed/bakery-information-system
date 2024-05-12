import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TuiDataListModule, TuiSvgModule } from '@taiga-ui/core';
import { ComboboxWithAddButtonDirective } from '../../variants/combobox-with-add-button.directive';

@Component({
  selector: 'ui-combobox-with-add-button-template',
  standalone: true,
  templateUrl: './combobox-with-add-button-template.component.html',
  styleUrl: './combobox-with-add-button-template.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TuiDataListModule, TuiSvgModule],
})
export class ComboboxWithAddButtonTemplateComponent {
  protected readonly directive = inject(ComboboxWithAddButtonDirective);
}
