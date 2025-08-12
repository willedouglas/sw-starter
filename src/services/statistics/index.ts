import { SearchType } from "@/modules/search/types";

import { SearchQuery, SearchStatistics, TopQuery } from "./types";

const FIVE_MINUTES = 5 * 60 * 1000;

export class StatisticsService {
  private queries: SearchQuery[] = [];
  private cachedStatistics: SearchStatistics | null = null;
  private lastComputation: Date | null = null;

  addQuery(query: string, searchType: SearchType, responseTime: number): void {
    this.queries.push({
      query,
      searchType,
      timestamp: new Date(),
      responseTime,
    });

    this.cachedStatistics = null;
  }

  getStatistics(): SearchStatistics {
    const now = new Date();

    const lastComputationTime = this.lastComputation?.getTime() || 0;

    const isCacheInvalid = !this.cachedStatistics || !this.lastComputation;
    const isCacheExpired = now.getTime() - lastComputationTime > FIVE_MINUTES;

    if (isCacheInvalid || isCacheExpired) {
      this.cachedStatistics = this.computeStatistics();
      this.lastComputation = now;
    }

    return this.cachedStatistics!;
  }

  private computeStatistics(): SearchStatistics {
    if (this.queries.length === 0) {
      return {
        topFiveQueries: [],
        averageResponseTime: 0,
        mostPopularHour: 0,
        totalQueries: 0,
        lastUpdated: new Date(),
      };
    }

    const queryCounts = new Map<string, number>();

    this.queries.forEach((q) => {
      const count = queryCounts.get(q.query) || 0;
      queryCounts.set(q.query, count + 1);
    });

    const topFiveQueries: TopQuery[] = Array.from(queryCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([query, count]) => ({
        query,
        count,
        percentage: Math.round((count / this.queries.length) * 100),
      }));

    const totalResponseTime = this.queries.reduce(
      (sum, q) => sum + q.responseTime,
      0
    );

    const averageResponseTime = Math.round(
      totalResponseTime / this.queries.length
    );

    const hourCounts = new Map<number, number>();

    this.queries.forEach((q) => {
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
      totalQueries: this.queries.length,
      lastUpdated: new Date(),
    };
  }

  getQueries(): SearchQuery[] {
    return [...this.queries];
  }

  clearStatistics(): void {
    this.queries = [];
    this.cachedStatistics = null;
    this.lastComputation = null;
  }
}
