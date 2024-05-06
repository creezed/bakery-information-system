import { Module } from '@nestjs/common';
import { UnitsModule } from './units/units.module';
import { StocksModule } from './stocks/stocks.module';

@Module({
  imports: [UnitsModule, StocksModule],
  exports: [UnitsModule, StocksModule],
})
export class CoreModule {}
