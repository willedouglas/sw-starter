import { Pagination } from "@/services/types";

export interface SearchParams {
  name: string;
}

export interface SearchResponse<T> extends Pagination {
  results: T[];
}

export interface Movie {
  title: string;
  url: string;
}

export interface People {
  name: string;
  url: string;
}
