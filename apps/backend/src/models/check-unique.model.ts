import { ApiProperty } from '@nestjs/swagger';

export class CheckUniqueModel {
  @ApiProperty()
  readonly success: boolean;
}
