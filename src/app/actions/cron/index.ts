"use server";

import cron from "node-cron";

import { getStatistics } from "@/app/actions/statistics";

class CronService {
  private static instance: CronService | null = null;

  private isInitialized = false;

  private constructor() {}

  public static getInstance(): CronService {
    if (!CronService.instance) {
      CronService.instance = new CronService();
    }
    return CronService.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    cron.schedule("*/5 * * * *", async () => {
      console.log("🔄 Recomputing search statistics...");

      try {
        const stats = await getStatistics();

        console.log(
          `✅ Statistics recomputed successfully. Total queries: ${stats.totalQueries}`
        );
      } catch (error) {
        console.error("❌ Error recomputing statistics:", error);
      }
    });

    console.log(
      "⏰ Cron jobs initialized - Statistics will be recomputed every 5 minutes!"
    );

    this.isInitialized = true;
  }

  async triggerManualStatisticsRecomputation(): Promise<void> {
    console.log("🔄 Manually triggering statistics recomputation...");

    try {
      const stats = await getStatistics();

      console.log(
        `✅ Manual recomputation successful. Total queries: ${stats.totalQueries}`
      );
    } catch (error) {
      console.error("❌ Error during manual recomputation:", error);
    }
  }
}

export const initialize = async (): Promise<void> => {
  return CronService.getInstance().initialize();
};
