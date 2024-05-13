import { Module } from '@nestjs/common';
import { UnitsModule } from './units/units.module';
import { StocksModule } from './stocks/stocks.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { SuppliersModule } from './suppliers/suppliers.module';

@Module({
  imports: [UnitsModule, StocksModule, IngredientsModule, SuppliersModule],
  exports: [UnitsModule, StocksModule, IngredientsModule, SuppliersModule],
})
export class CoreModule {}
