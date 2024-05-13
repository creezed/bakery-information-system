import { Module } from '@nestjs/common';
import { SuppliersService } from './services/suppliers.service';
import { SuppliersController } from './controllers/suppliers.controller';
import { PrismaModule } from '../../prisma';

@Module({
  imports: [PrismaModule],
  providers: [SuppliersService],
  controllers: [SuppliersController],
})
export class SuppliersModule {}
