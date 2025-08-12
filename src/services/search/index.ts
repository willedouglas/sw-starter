import { BaseService } from "@/services/BaseService";

import { statisticsService } from "@/services";

import { Movie, People, SearchParams, SearchResponse } from "./types";

export class SearchService extends BaseService {
  constructor() {
    const baseURL = process.env.NEXT_PUBLIC_SEARCH_API_URL || "";

    super(baseURL);
  }

  async getMovies(params: SearchParams): Promise<SearchResponse<Movie>> {
    const startTime = Date.now();

    try {
      const response = await this.get<SearchResponse<Movie>>("/films", {
        params: {
          search: params.query,
        },
      });

      const responseTime = Date.now() - startTime;
      statisticsService.addQuery(params.query, "movies", responseTime);

      return response.data;
    } catch (error) {
      const responseTime = Date.now() - startTime;
      statisticsService.addQuery(params.query, "movies", responseTime);
      throw error;
    }
  }

  async getPeople(params: SearchParams): Promise<SearchResponse<People>> {
    const startTime = Date.now();

    try {
      const response = await this.get<SearchResponse<People>>("/people", {
        params: {
          search: params.query,
        },
      });

      const responseTime = Date.now() - startTime;
      statisticsService.addQuery(params.query, "people", responseTime);

      return response.data;
    } catch (error) {
      const responseTime = Date.now() - startTime;
      statisticsService.addQuery(params.query, "people", responseTime);
      throw error;
    }
  }

  async getMovie(id: string): Promise<Movie> {
    const response = await this.get<Movie>(`/films/${id}`);

    return response.data;
  }

  async getPerson(id: string): Promise<People> {
    const response = await this.get<People>(`/people/${id}`);

    return response.data;
  }
}
