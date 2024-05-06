import { Stock as StockModel } from '../prisma';
import { ApiProperty } from '@nestjs/swagger';

export class Stock implements StockModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  name: string;

  createdAt: Date;

  deletedAt: Date | null;

  updatedAt: Date;
}
