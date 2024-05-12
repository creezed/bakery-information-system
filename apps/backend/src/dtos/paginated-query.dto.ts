import { ApiProperty } from '@nestjs/swagger';

export class PaginatedQueryDto {
  @ApiProperty({ required: false })
  page?: number;

  @ApiProperty({ required: false })
  limit?: number;

  @ApiProperty({ required: false })
  sortBy?: string;

  @ApiProperty({ required: false })
  search?: string;
}
