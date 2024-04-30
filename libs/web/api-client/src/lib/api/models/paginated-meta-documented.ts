/* tslint:disable */
/* eslint-disable */
export interface PaginatedMetaDocumented {
  currentPage: number;
  itemsPerPage: number;
  sortBy?: Array<Array<(string | 'ASC' | 'DESC')>>;
  totalItems: number;
  totalPages: number;
}
