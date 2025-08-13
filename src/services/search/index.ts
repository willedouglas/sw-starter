"use server";

import * as SearchService from "@/app/actions/search";
import {
  SearchParams,
  SearchResponse,
  Movie,
  People,
} from "@/app/actions/search/types";

export async function getMovies(
  params: SearchParams
): Promise<SearchResponse<Movie>> {
  return SearchService.getMovies(params);
}

export async function getPeople(
  params: SearchParams
): Promise<SearchResponse<People>> {
  return SearchService.getPeople(params);
}

export async function getMovie(id: string): Promise<Movie> {
  return SearchService.getMovie(id);
}

export async function getPerson(id: string): Promise<People> {
  return SearchService.getPerson(id);
}
