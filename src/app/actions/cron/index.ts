"use server";

import cron from "node-cron";

import { recomputeStatistics } from "@/app/actions/statistics";

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
        await recomputeStatistics();

        console.log(`✅ Statistics recomputed successfully.`);
      } catch (error) {
        console.error("❌ Error recomputing statistics:", error);
      }
    });

    console.log(
      "⏰ Cron initialized - Statistics will be recomputed every 5 minutes!"
    );

    this.isInitialized = true;
  }
}

export const initialize = async (): Promise<void> => {
  return CronService.getInstance().initialize();
};
