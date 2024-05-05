import { Operation } from 'fast-json-patch';
import { IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { JsonPatchModel } from '../models/json-patch.model';

export class JsonPatchDto {
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ type: JsonPatchModel, isArray: true })
  patch: Operation[];
}
