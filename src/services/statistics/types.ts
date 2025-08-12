import { SearchType } from "@/modules/search/types";

export interface SearchQuery {
  query: string;
  searchType: SearchType;
  timestamp: Date;
  responseTime: number;
}

export interface TopQuery {
  query: string;
  count: number;
  percentage: number;
}

export interface SearchStatistics {
  topFiveQueries: TopQuery[];
  averageResponseTime: number;
  mostPopularHour: number;
  totalQueries: number;
  lastUpdated: Date;
}

export interface StatisticsResponse {
  success: boolean;
  data: SearchStatistics;
  message?: string;
}
