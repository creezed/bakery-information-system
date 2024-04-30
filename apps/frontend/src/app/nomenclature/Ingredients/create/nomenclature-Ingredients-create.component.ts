import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nomenclature-ingredients-create',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nomenclature-Ingredients-create.component.html',
  styleUrl: './nomenclature-Ingredients-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NomenclatureIngredientsCreateComponent {}
