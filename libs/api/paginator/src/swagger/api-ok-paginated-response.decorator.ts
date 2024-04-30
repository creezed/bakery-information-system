import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginatedDocumented } from './paginated-swagger.type';

export const ApiOkPaginatedResponse = <DTO extends Type<unknown>>(
  dataDto: DTO
) => {
  return applyDecorators(
    ApiExtraModels(PaginatedDocumented, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedDocumented) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    })
  );
};
