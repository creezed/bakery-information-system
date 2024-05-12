import { Module } from '@nestjs/common';
import { IngredientsController } from './controllers/ingredients.controller';
import { IngredientsService } from './services/ingredients.service';
import { PrismaModule } from '../../prisma';
import { UnitsModule } from '../units/units.module';

@Module({
  imports: [PrismaModule, UnitsModule],
  controllers: [IngredientsController],
  providers: [IngredientsService],
})
export class IngredientsModule {}
