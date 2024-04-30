import { Prisma } from '../../../prisma';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUnitDto implements Prisma.UnitCreateInput {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly code: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly fullName: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
