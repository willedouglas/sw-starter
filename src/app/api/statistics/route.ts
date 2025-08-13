"use server";

import { NextResponse } from "next/server";
import { StatisticsResponse } from "@/app/actions/statistics/types";
import { getStatistics } from "@/app/actions/statistics";

export async function GET(): Promise<NextResponse<StatisticsResponse>> {
  try {
    const statistics = await getStatistics();

    const response: StatisticsResponse = {
      success: true,
      data: statistics,
      message: "Statistics retrieved successfully!",
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error retrieving statistics:", error);

    const errorResponse: StatisticsResponse = {
      success: false,
      data: {
        topFiveQueries: [],
        averageResponseTime: 0,
        mostPopularHour: 0,
        totalQueries: 0,
        lastUpdated: new Date(),
      },
      message: "Failed to retrieve statistics.",
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
