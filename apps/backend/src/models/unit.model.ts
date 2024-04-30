import { Unit as UnitModel } from '../prisma';
import { ApiProperty } from '@nestjs/swagger';

export class Unit implements UnitModel {
  @ApiProperty()
  readonly code: string;

  @ApiProperty()
  readonly fullName: string;

  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  readonly deletedAt: Date | null;
}
