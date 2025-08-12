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

interface Person extends Omit<People, "films"> {
  films: Movie[];
}

interface DetailRowProps {
  title: string;
  value: string;
}

const DetailRow = ({ title, value }: DetailRowProps) => {
  return (
    <div className="flex flex-row gap-[2.5px]">
      <div className="text-sm text-black">{title}</div>
      <div className="text-sm text-black">{value}</div>
    </div>
  );
};

export default function PeoplePage() {
  const router = useRouter();
  const params = useParams();

  const [person, setPerson] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onBackToSearchClick = useCallback(() => {
    router.push("/");
  }, [router]);

  useEffect(() => {
    const getPerson = async () => {
      const id = params.people as string;

      try {
        setIsLoading(true);

        const person = await searchService.getPerson(id);

        const movies = person.films.map((url) => {
          const movieId = getResourceId(url);

          return searchService.getMovie(movieId);
        });

        const handled = await Promise.all(movies);

        setPerson({
          ...person,
          films: handled,
        });
      } catch {
        onBackToSearchClick();
      } finally {
        setIsLoading(false);
      }
    };

    getPerson();
  }, [onBackToSearchClick, params.people]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <span className="text-sm font-bold text-[var(--color-pinkish-grey)]">
          Loading...
        </span>
      </div>
    );
  }

  if (!person) {
    return null;
  }

  return (
    <div className="flex flex-col items-center max-w-[401px] h-[210px] mx-auto">
      <Card className="h-full flex flex-col">
        <div className="text-md font-bold text-black pb-[15px]">
          {person.name}
        </div>

        <div className="flex flex-row justify-between gap-[50px] flex-1">
          <div className="flex-1">
            <DetailSection title="Details">
              <DetailRow title="Birth:" value={person.birth_year} />
              <DetailRow title="Gender:" value={person.gender} />
              <DetailRow title="Eye Color:" value={person.eye_color} />
              <DetailRow title="Hair Color:" value={person.hair_color} />
              <DetailRow title="Height:" value={person.height} />
              <DetailRow title="Mass:" value={person.mass} />
            </DetailSection>
          </div>

          <div className="flex-1">
            <DetailSection title="Movies">
              <div className="flex flex-row flex-wrap gap-[5px]">
                {person.films.map((movie) => (
                  <Link
                    href={`/movies/${getResourceId(movie.url)}`}
                    key={movie.url}
                  >
                    {movie.title}
                  </Link>
                ))}
              </div>
            </DetailSection>
          </div>
        </div>

        <div className="flex justify-start">
          <Button onClick={onBackToSearchClick}>Back to Search</Button>
        </div>
      </Card>
    </div>
  );
}
