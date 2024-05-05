import { ApiProperty } from '@nestjs/swagger';

export class JsonPatchModel {
  @ApiProperty()
  readonly op: 'add' | 'remove' | 'replace' | 'move' | 'copy' | 'test' | '_get';

  @ApiProperty()
  readonly path: string;

  @ApiProperty()
  readonly value?: [] | string | number | boolean | Record<string, unknown>;

  @ApiProperty()
  readonly from?: string;
}
