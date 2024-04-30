import { ApiProperty } from '@nestjs/swagger';
import { Paginated } from '../paginate';

export class PaginatedMetaDocumented<T> {
  @ApiProperty({
    title: 'Number of items per page',
    required: true,
    type: 'number',
  })
  itemsPerPage!: number;

  @ApiProperty({
    title: 'Total number of items',
    required: true,
    type: 'number',
  })
  totalItems!: number;

  @ApiProperty({
    title: 'Current requested page',
    required: true,
    type: 'number',
  })
  currentPage!: number;

  @ApiProperty({
    title: 'Total number of pages',
    required: true,
    type: 'number',
  })
  totalPages!: number;

  @ApiProperty({
    title: 'Sorting by columns',
    required: false,
    type: 'array',
    items: {
      type: 'array',
      items: {
        oneOf: [
          {
            type: 'string',
          },
          {
            type: 'string',
            enum: ['ASC', 'DESC'],
          },
        ],
      },
    },
  })
  sortBy!: [string, 'asc' | 'desc'][];
}

export class PaginatedDocumented<T> implements Paginated<T> {
  @ApiProperty({
    isArray: true,
    required: true,
    title: 'Array of entities',
    type: 'object',
  })
  data!: T[];

  @ApiProperty({
    title: 'Pagination Metadata',
    required: true,
  })
  meta!: PaginatedMetaDocumented<T>;
}
