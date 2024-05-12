import { PaginatedQueryModel } from '@bakery-information-system/web/shared';
import { Writable } from '../types';

export class PaginatedBuilder {
  private readonly query: Writable<PaginatedQueryModel>;

  constructor() {
    this.query = {};
  }

  setPage(page: number): PaginatedBuilder {
    this.query.page = page;
    return this;
  }

  setLimit(limit: number): PaginatedBuilder {
    this.query.limit = limit;
    return this;
  }

  setSearch(property: string, searchValue: string): PaginatedBuilder {
    if (!searchValue) {
      return this;
    }

    if (!this.query.search) {
      this.query.search = `${property}:${searchValue}`;
    } else {
      this.query.search += `,${property}:${searchValue}`;
    }
    return this;
  }

  build(): PaginatedQueryModel {
    return this.query;
  }
}
