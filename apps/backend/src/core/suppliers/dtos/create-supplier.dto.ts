import { Prisma } from '../../../prisma';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateSupplierDto implements Prisma.SupplierCreateInput {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsPhoneNumber('RU')
  phone: string | null;
}
