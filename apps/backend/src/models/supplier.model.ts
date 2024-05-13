import { Supplier as SupplierModel } from '../prisma';
import { ApiProperty } from '@nestjs/swagger';

export class Supplier implements SupplierModel {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly phone: string | null;

  readonly deletedAt: Date | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
