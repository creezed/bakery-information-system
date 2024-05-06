import { Prisma } from '../../../prisma';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStockDto implements Prisma.StockCreateInput {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly code: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
