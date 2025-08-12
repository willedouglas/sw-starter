"use client";

import { useState } from "react";

import Results from "@/modules/search/components/SearchResults";
import SearchForm from "@/modules/search/components/SearchForm";

import useSearch, { SearchResultItem } from "@/modules/search/hooks/useSearch";

import { SearchType } from "@/modules/search/types";

export default function SearchPage() {
  const [results, setResults] = useState<SearchResultItem[]>([]);

  const { search, isLoading } = useSearch();

  const handleSearch = async (searchType: SearchType, query: string) => {
    const response = await search(searchType, query);

    setResults(response);
  };

  return (
    <div className="flex flex-col">
      <div className="flex-grow flex justify-center items-start">
        <div className="flex flex-col sm:flex-row gap-[15px]">
          <div className="flex-shrink-0">
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          </div>
          <div className="flex-1">
            <Results items={results} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
