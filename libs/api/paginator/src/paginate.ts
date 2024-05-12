import { PaginateQuery } from './decorators/paginate.decorator';
import { isEntityKey, positiveNumberOrDefault } from './utils/utils';

export interface Paginated<T> {
  readonly data: T[];
  readonly meta: {
    readonly itemsPerPage: number;
    readonly totalItems: number;
    readonly currentPage: number;
    readonly totalPages: number;
    readonly sortBy: [string, 'asc' | 'desc'][];
  };
}

export interface PaginateConfig<T> {
  sortableColumns: (keyof T & string)[];
  maxLimit?: number;
  defaultSortBy?: [string, 'asc' | 'desc'][];
  defaultLimit?: number;
}

export const DEFAULT_MAX_LIMIT = 100;
export const DEFAULT_LIMIT = 20;
export const NO_PAGINATION = 0;

interface PaginateArgs<T> {
  query: PaginateQuery;
  model: any;
  config: PaginateConfig<T>;
}

interface FindManyArgs {
  readonly take: number;
  readonly skip: number;
  readonly orderBy: Record<string, 'asc' | 'desc'>;
  readonly where: {
    [key: string]: {
      search: string;
    };
  };
}

export async function paginate<T>({
  query,
  model,
  config,
}: PaginateArgs<T>): Promise<Paginated<T>> {
  const page = positiveNumberOrDefault(query.page, 1, 1);

  const defaultLimit = config.defaultLimit || DEFAULT_LIMIT;
  const maxLimit = positiveNumberOrDefault(config.maxLimit, DEFAULT_MAX_LIMIT);
  const queryLimit = positiveNumberOrDefault(query.limit, defaultLimit);

  const isPaginated = !(
    queryLimit === NO_PAGINATION && maxLimit === NO_PAGINATION
  );

  const limit = isPaginated
    ? Math.min(queryLimit || defaultLimit, maxLimit || DEFAULT_MAX_LIMIT)
    : NO_PAGINATION;

  const sortBy: [string, 'asc' | 'desc'][] = [];

  const search: [string, string][] = [];

  const skip = page > 0 ? limit * (page - 1) : 0;

  const findManyArgs: FindManyArgs = {
    take: limit,
    skip,
    orderBy: {},
    where: {},
  };

  if (query.sortBy) {
    for (const order of query.sortBy) {
      if (
        isEntityKey(config.sortableColumns, order[0]) &&
        ['asc', 'desc'].includes(order[1])
      ) {
        sortBy.push(order);
      }
    }
  }

  if (query.search) {
    for (const searchItem of query.search) {
      search.push(searchItem);
    }
  }

  if (!sortBy.length) {
    sortBy.push(
      ...(config.defaultSortBy || [[config.sortableColumns[0], 'asc']])
    );
  }

  sortBy.forEach((order) => {
    findManyArgs.orderBy[order[0]] = order[1];
  });

  search.forEach((searchItem) => {
    findManyArgs.where[searchItem[0]] = { search: searchItem[1] };
  });

  const [total, data] = await Promise.all([
    model.count(),
    model.findMany(findManyArgs),
  ]);

  const totalPages = isPaginated ? Math.ceil(total / limit) : 1;

  return {
    data,
    meta: {
      itemsPerPage: isPaginated ? limit : total,
      totalItems: total,
      currentPage: page,
      totalPages,
      sortBy,
    },
  };
}
