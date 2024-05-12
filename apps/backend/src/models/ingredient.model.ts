import { Ingredient as IngredientModel, Prisma } from '../prisma';
import { ApiProperty } from '@nestjs/swagger';

export class Ingredient implements IngredientModel {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly article: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly unitId: string;

  @ApiProperty({ type: Number })
  readonly weightKg: Prisma.Decimal;

  readonly updatedAt: Date;

  readonly createdAt: Date;

  readonly deletedAt: Date | null;
}
