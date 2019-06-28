export class PagedResult<T> {
    currentPage: number;
    pageCount: number;
    pageSize: number;
    totalRecords: number;
    result: T[];
}
