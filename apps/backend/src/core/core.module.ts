import { Module } from '@nestjs/common';
import { UnitsModule } from './units/units.module';
import { StocksModule } from './stocks/stocks.module';
import { IngredientsModule } from './ingredients/ingredients.module';

@Module({
  imports: [UnitsModule, StocksModule, IngredientsModule],
  exports: [UnitsModule, StocksModule],
})
export class CoreModule {}
