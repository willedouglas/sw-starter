import { Pagination } from "@/services/types";

export interface SearchParams {
  query: string;
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
  birth_year: string;
  gender: string;
  eye_color: string;
  hair_color: string;
  height: string;
  mass: string;
  films: string[];
  url: string;
}
