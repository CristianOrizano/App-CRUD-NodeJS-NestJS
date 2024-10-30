import { AutoMap } from "@automapper/classes";

export class PageResponse<T> {
    @AutoMap()
    data: T[];
    page: number;
    rows: number;
    total: number;
  }
  