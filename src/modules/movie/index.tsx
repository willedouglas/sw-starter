"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Link from "@/components/Link";
import DetailSection from "@/components/DetailSection";

import { searchService } from "@/services";

import { Movie, People } from "@/services/search/types";

import { getResourceId } from "@/utils/url";

interface Film extends Omit<Movie, "characters"> {
  characters: People[];
}

export default function MoviePage() {
  const router = useRouter();
  const params = useParams();

  const [film, setFilm] = useState<Film | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onBackToSearchClick = useCallback(() => {
    router.push("/");
  }, [router]);

  useEffect(() => {
    const getPerson = async () => {
      const id = params.movies as string;

      try {
        setIsLoading(true);

        const movie = await searchService.getMovie(id);

        const people = movie.characters.map((url) => {
          const personId = getResourceId(url);

          return searchService.getPerson(personId);
        });

        const handled = await Promise.all(people);

        setFilm({
          ...movie,
          characters: handled,
        });
      } catch {
        onBackToSearchClick();
      } finally {
        setIsLoading(false);
      }
    };

    getPerson();
  }, [onBackToSearchClick, params.movies]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <span className="text-sm font-bold text-[var(--color-pinkish-grey)]">
          Loading...
        </span>
      </div>
    );
  }

  if (!film) {
    return null;
  }

  return (
    <div className="flex flex-col items-center max-w-[401px] mx-auto">
      <Card className="h-full flex flex-col">
        <div className="text-md font-bold text-black pb-[15px]">
          {film.title}
        </div>

        <div className="flex flex-row justify-between gap-[50px] flex-1">
          <div className="flex-1">
            <DetailSection title="Opening Crawl">
              <div className="text-sm text-black whitespace-pre-line">
                {film.opening_crawl}
              </div>
            </DetailSection>
          </div>

          <div className="flex-1">
            <DetailSection title="Characters">
              <div className="flex flex-row flex-wrap gap-[5px]">
                {film.characters.map((character) => (
                  <Link
                    href={`/people/${getResourceId(character.url)}`}
                    key={character.url}
                  >
                    {character.name}
                  </Link>
                ))}
              </div>
            </DetailSection>
          </div>
        </div>

        <div className="flex justify-start pt-[15px]">
          <Button onClick={onBackToSearchClick}>Back to Search</Button>
        </div>
      </Card>
    </div>
  );
}
