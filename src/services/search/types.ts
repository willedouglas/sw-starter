import { Pagination } from "@/services/types";

export interface SearchParams {
  name: string;
}

export interface SearchResponse<T> extends Pagination {
  results: T[];
}

export interface Movie {
  uid: string;
  name: string;
  url: string;
}

export interface People {
  uid: string;
  name: string;
  url: string;
}
