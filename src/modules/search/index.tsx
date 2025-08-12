"use client";

import { SearchType } from "@/modules/search/types";

import Header from "@/components/Header";
import Results from "@/modules/search/components/SearchResults";
import SearchForm from "@/modules/search/components/SearchForm";

export default function SearchPage() {
  const handleSearch = async (searchType: SearchType, query: string) => {
    console.log("Searching:", { searchType, query });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header title="SWStarter" />

      <main className="flex-grow flex justify-center items-start bg-light-gray">
        <div className="flex flex-col sm:flex-row gap-[15px] pt-[15px]">
          <div className="flex-shrink-0">
            <SearchForm onSearch={handleSearch} />
          </div>
          <div className="flex-1">
            <Results items={[]} />
          </div>
        </div>
      </main>
    </div>
  );
}
