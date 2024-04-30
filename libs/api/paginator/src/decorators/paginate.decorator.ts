import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { isString } from 'lodash';

export interface PaginateQuery {
  page?: number;
  limit?: number;
  sortBy?: [string, 'asc' | 'desc'][];
}

const multipleSplit = (param: string, res: any[]) => {
  const items = param.split(':');
  if (items.length === 2) {
    res.push(items as [string, string]);
  }
};

function parseParam<T>(
  queryParam: unknown,
  parserLogic: (param: string, res: any[]) => void
): T[] | undefined {
  const res: T[] = [];

  if (!queryParam) {
    return;
  }

  const params = !Array.isArray(queryParam) ? [queryParam] : queryParam;

  params.forEach((param) => isString(param) && parserLogic(param, res));

  return res.length ? res : undefined;
}

export const Paginate = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): PaginateQuery => {
    const request: ExpressRequest = ctx.switchToHttp().getRequest();
    const query = request.query as Record<string, unknown>;

    const sortBy = parseParam<[string, string]>(
      query['sortBy'],
      multipleSplit
    ) as [string, 'asc' | 'desc'][] | undefined;

    return {
      page: query['page'] ? parseInt(query['page'].toString(), 10) : undefined,
      limit: query['limit']
        ? parseInt(query['limit'].toString(), 10)
        : undefined,
      sortBy,
    };
  }
);
