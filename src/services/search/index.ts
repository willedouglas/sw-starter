import { BaseService } from "@/services/BaseService";

import { Movie, People, SearchParams, SearchResponse } from "./types";

export class SearchService extends BaseService {
  constructor() {
    const baseURL = process.env.NEXT_PUBLIC_SEARCH_API_URL || "";

    super(baseURL);
  }

  async getMovies(params: SearchParams): Promise<SearchResponse<Movie>> {
    const response = await this.get<SearchResponse<Movie>>("/films", {
      params: {
        search: params.query,
      },
    });

    return response.data;
  }

  async getPeople(params: SearchParams): Promise<SearchResponse<People>> {
    const response = await this.get<SearchResponse<People>>("/people", {
      params: {
        search: params.query,
      },
    });

    return response.data;
  }
}
