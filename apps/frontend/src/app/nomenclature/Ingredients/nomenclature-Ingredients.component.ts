import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientModel } from './models/Ingredient.model';
import { TuiTableModule } from '@taiga-ui/addon-table';

@Component({
  selector: 'app-nomenclature-ingredients',
  standalone: true,
  imports: [CommonModule, TuiTableModule],
  templateUrl: './nomenclature-Ingredients.component.html',
  styleUrl: './nomenclature-Ingredients.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NomenclatureIngredientsComponent {
  protected mock: IngredientModel[] = [
    {
      name: 'Лук',
      vendorCode: '3',
      unit: '',
      baseUnitWeightKg: '',
    },
    {
      name: 'Курица',
      vendorCode: '5',
      unit: '',
      baseUnitWeightKg: '',
    },
  ];

  protected columns = ['name', 'vendorCode'];
}
