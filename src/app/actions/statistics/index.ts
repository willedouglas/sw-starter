"use server";

import { writeFile, readFile, mkdir } from "fs/promises";

import { join } from "path";

import { SearchType } from "@/app/actions/search/types";
import {
  SearchQuery,
  SearchStatistics,
  TopQuery,
} from "@/app/actions/statistics/types";

const DATA_FILE = join(process.cwd(), "data", "statistics-data.json");
const COMPUTED_FILE = join(process.cwd(), "data", "statistics-computed.json");

type RawQuery = Omit<SearchQuery, "timestamp"> & { timestamp: string };

async function ensureDataDir() {
  try {
    await mkdir(join(process.cwd(), "data"), { recursive: true });
  } catch {
    return;
  }
}

async function loadQueries(): Promise<SearchQuery[]> {
  try {
    await ensureDataDir();
    const data = await readFile(DATA_FILE, "utf-8");
    const rawQueries = JSON.parse(data);

    const handled = rawQueries.map((q: RawQuery) => ({
      ...q,
      timestamp: new Date(q.timestamp),
    }));

    return handled;
  } catch {
    return [];
  }
}

async function loadCalculatedStatistics(): Promise<SearchStatistics> {
  try {
    await ensureDataDir();
    const data = await readFile(COMPUTED_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return {
      topFiveQueries: [],
      averageResponseTime: 0,
      mostPopularHour: 0,
      totalQueries: 0,
      lastUpdated: new Date(),
    };
  }
}

async function saveQueries(queries: SearchQuery[]): Promise<void> {
  try {
    await ensureDataDir();
    await writeFile(DATA_FILE, JSON.stringify(queries, null, 2));
  } catch {
    return;
  }
}

async function saveCalculatedStatistics(
  statistics: SearchStatistics
): Promise<void> {
  try {
    await ensureDataDir();
    await writeFile(COMPUTED_FILE, JSON.stringify(statistics, null, 2));
  } catch {
    return;
  }
}

function computeStatistics(queries: SearchQuery[]): SearchStatistics {
  if (queries.length === 0) {
    return {
      topFiveQueries: [],
      averageResponseTime: 0,
      mostPopularHour: 0,
      totalQueries: 0,
      lastUpdated: new Date(),
    };
  }

  const queryCounts = new Map<string, number>();

  queries.forEach((q) => {
    const count = queryCounts.get(q.query) || 0;
    queryCounts.set(q.query, count + 1);
  });

  const topFiveQueries: TopQuery[] = Array.from(queryCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([query, count]) => ({
      query,
      count,
      percentage: Math.round((count / queries.length) * 100),
    }));

  const totalResponseTime = queries.reduce((sum, q) => sum + q.responseTime, 0);

  const averageResponseTime = Math.round(totalResponseTime / queries.length);

  const hourCounts = new Map<number, number>();

  queries.forEach((q) => {
    const hour = q.timestamp.getHours();
    const count = hourCounts.get(hour) || 0;
    hourCounts.set(hour, count + 1);
  });

  let mostPopularHour = 0;
  let maxCount = 0;

  hourCounts.forEach((count, hour) => {
    if (count > maxCount) {
      maxCount = count;
      mostPopularHour = hour;
    }
  });

  return {
    topFiveQueries,
    averageResponseTime,
    mostPopularHour,
    totalQueries: queries.length,
    lastUpdated: new Date(),
  };
}

export const addQuery = async (
  query: string,
  searchType: SearchType,
  responseTime: number
): Promise<void> => {
  const newQuery: SearchQuery = {
    query,
    searchType,
    timestamp: new Date(),
    responseTime,
  };

  const queries = await loadQueries();

  queries.push(newQuery);

  await saveQueries(queries);
};

export const getStatistics = async (): Promise<SearchStatistics> => {
  const calculatedStatistics = await loadCalculatedStatistics();

  return calculatedStatistics;
};

export const recomputeStatistics = async (): Promise<void> => {
  const queries = await loadQueries();

  const statistics = computeStatistics(queries);

  await saveCalculatedStatistics(statistics);
  await saveQueries([]);
};
