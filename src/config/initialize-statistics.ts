import { initialize } from "@/app/actions/cron";

export function initializeStatistics(): void {
  const isProduction = process.env.NODE_ENV === "production";
  const isCronEnabled = process.env.INIT_CRON === "true";

  if (isProduction || isCronEnabled) {
    initialize();
  }
}

initializeStatistics();
