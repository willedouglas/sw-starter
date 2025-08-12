import cron from "node-cron";

import { statisticsService } from "@/services";

export class CronService {
  private isInitialized = false;

  initialize(): void {
    if (this.isInitialized) {
      return;
    }

    cron.schedule("*/5 * * * *", () => {
      console.log("🔄 Recomputing search statistics...");

      try {
        const stats = statisticsService.getStatistics();

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

  triggerManualStatisticsRecomputation(): void {
    console.log("🔄 Manually triggering statistics recomputation...");

    try {
      const stats = statisticsService.getStatistics();

      console.log(
        `✅ Manual recomputation successful. Total queries: ${stats.totalQueries}`
      );
    } catch (error) {
      console.error("❌ Error during manual recomputation:", error);
    }
  }
}
