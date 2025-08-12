"use client";

import { useState, JSX } from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";

import { SearchType } from "@/modules/search/types";

type SearchTypeOption = {
  label: string;
  value: SearchType;
};

interface SearchFormProps {
  isLoading?: boolean;
  onSearch: (searchType: SearchType, query: string) => Promise<void>;
}

const SEARCH_TYPES: SearchTypeOption[] = [
  {
    label: "People",
    value: "people",
  },
  {
    label: "Movies",
    value: "movies",
  },
];

const getPlaceholder = (searchType: SearchType) => {
  const isMovieSearch = searchType === "movies";

  if (isMovieSearch) {
    return "e.g. Return of the Jedi, Attack of the Clones, A New Hope";
  }

  return "e.g. Chewbacca, Yoda, Boba Fett";
};

export default function SearchForm({
  isLoading = false,
  onSearch,
}: SearchFormProps): JSX.Element {
  const [searchType, setSearchType] = useState<SearchType>("people");

  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchType, query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchType, query);
    }
  };

  const isSearchDisabled = query.length === 0;

  return (
    <Card className="min-w-[205px]">
      <div className="flex flex-col gap-[10px]">
        <legend className="text-sm font-semibold text-dark-gray">
          What are you searching for?
        </legend>

        <div className="flex items-center gap-[15px]">
          {SEARCH_TYPES.map((type) => (
            <label className="flex items-center gap-[5px]" key={type.value}>
              <input
                type="radio"
                name={type.label}
                value={type.value}
                checked={searchType === type.value}
                onChange={() => setSearchType(type.value)}
              />
              <span className="text-sm font-bold text-black">{type.label}</span>
            </label>
          ))}
        </div>

        <Input
          type="text"
          placeholder={getPlaceholder(searchType)}
          value={query}
          onKeyDown={handleKeyDown}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Button disabled={isSearchDisabled || isLoading} onClick={handleSubmit}>
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>
    </Card>
  );
}
