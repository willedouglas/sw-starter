"use server";

import { addQuery } from "@/app/actions/statistics";

import {
  Movie,
  People,
  SearchParams,
  SearchResponse,
} from "@/app/actions/search/types";

import apiClient from "@/utils/api";

export async function getMovies(
  params: SearchParams
): Promise<SearchResponse<Movie>> {
  const startTime = Date.now();

  try {
    const response = await apiClient.get<SearchResponse<Movie>>("/films", {
      params: {
        search: params.query,
      },
    });

    const responseTime = Date.now() - startTime;

    await addQuery(params.query, "movies", responseTime);

    return response.data;
  } catch (error) {
    const responseTime = Date.now() - startTime;

    await addQuery(params.query, "movies", responseTime);

    throw error;
  }
}

export async function getPeople(
  params: SearchParams
): Promise<SearchResponse<People>> {
  const startTime = Date.now();

  try {
    const response = await apiClient.get<SearchResponse<People>>("/people", {
      params: {
        search: params.query,
      },
    });

    const responseTime = Date.now() - startTime;
    await addQuery(params.query, "people", responseTime);

    return response.data;
  } catch (error) {
    const responseTime = Date.now() - startTime;

    await addQuery(params.query, "people", responseTime);

    throw error;
  }
}

export async function getMovie(id: string): Promise<Movie> {
  const response = await apiClient.get<Movie>(`/films/${id}`);

  return response.data;
}

export async function getPerson(id: string): Promise<People> {
  const response = await apiClient.get<People>(`/people/${id}`);

  return response.data;
}
