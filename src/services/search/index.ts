import { BaseService } from "@/services/BaseService";
import { Movie, People, SearchParams, SearchResponse } from "./types";

export class SearchService extends BaseService {
  constructor() {
    super(process.env.NEXT_PUBLIC_SEARCH_API_URL || "");
  }

  async getMovies(params: SearchParams): Promise<SearchResponse<Movie>> {
    const response = await this.get<SearchResponse<Movie>>("/movies", {
      params: {
        name: params.name,
      },
    });

    return response.data;
  }

  async getPeople(params: SearchParams): Promise<SearchResponse<People>> {
    const response = await this.get<SearchResponse<People>>("/people", {
      params: {
        name: params.name,
      },
    });

    return response.data;
  }
}
