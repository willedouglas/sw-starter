"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Results from "@/modules/search/components/SearchResults";
import SearchForm from "@/modules/search/components/SearchForm";

import useSearch, { SearchResultItem } from "@/modules/search/hooks/useSearch";

import { SearchType } from "@/modules/search/types";

import { getResourceId } from "@/utils/url";
import { getResourceType } from "@/utils/url";

export default function SearchPage() {
  const router = useRouter();

  const [results, setResults] = useState<SearchResultItem[]>([]);

  const { search, isLoading } = useSearch();

  const handleSearch = async (searchType: SearchType, query: string) => {
    const response = await search(searchType, query);

    setResults(response);
  };

  const handleItemDetailsClick = (item: SearchResultItem) => {
    const id = getResourceId(item.url);
    const type = getResourceType(item.url);

    const isPeopleSearch = type === "people";

    if (isPeopleSearch) {
      return router.push(`/people/${id}`);
    }

    router.push(`/movies/${id}`);
  };

  return (
    <div className="flex flex-col">
      <div className="flex-grow flex justify-center items-start">
        <div className="flex flex-col sm:flex-row gap-[15px]">
          <div className="flex-shrink-0">
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          </div>
          <div className="flex-1">
            <Results
              items={results}
              isLoading={isLoading}
              onItemDetailsClick={handleItemDetailsClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
