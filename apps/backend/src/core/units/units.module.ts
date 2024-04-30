import { Module } from '@nestjs/common';
import { UnitsService } from './services/units.service';
import { UnitsController } from './controllers/units.controller';
import { PrismaModule } from '../../prisma';

@Module({
  imports: [PrismaModule],
  providers: [UnitsService],
  controllers: [UnitsController],
})
export class UnitsModule {}
