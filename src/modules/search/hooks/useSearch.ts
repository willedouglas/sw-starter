import { useState } from "react";

import { getMovies, getPeople } from "@/services/search";

import { SearchType } from "@/app/actions/search/types";

export type SearchResultItem = {
  name: string;
  url: string;
};

interface UseSearch {
  search: (
    searchType: SearchType,
    query: string
  ) => Promise<SearchResultItem[]>;
  isLoading: boolean;
}

export default function useSearch(): UseSearch {
  const [isLoading, setIsLoading] = useState(false);

  const search = async (
    searchType: SearchType,
    query: string
  ): Promise<SearchResultItem[]> => {
    const isMovieSearch = searchType === "movies";
    const isPeopleSearch = searchType === "people";

    let results: SearchResultItem[] = [];

    setIsLoading(true);

    try {
      if (isMovieSearch) {
        const response = await getMovies({ query });

        results =
          response.results.map((result) => ({
            name: result.title,
            url: result.url,
          })) ?? [];
      }

      if (isPeopleSearch) {
        const response = await getPeople({ query });

        results =
          response.results.map((result) => ({
            name: result.name,
            url: result.url,
          })) ?? [];
      }

      return results;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    search,
    isLoading,
  };
}
