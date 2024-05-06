import { Module } from '@nestjs/common';
import { StocksController } from './controllers/stocks.controller';
import { StocksService } from './services/stocks.service';
import { PrismaModule } from '../../prisma';

@Module({
  imports: [PrismaModule],
  controllers: [StocksController],
  providers: [StocksService],
})
export class StocksModule {}
