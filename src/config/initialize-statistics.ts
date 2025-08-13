"use server";

import { initialize } from "@/app/actions/cron";

export async function initializeStatistics(): Promise<void> {
  const isCronEnabled = process.env.INIT_CRON === "true";

  if (isCronEnabled) {
    await initialize();
  }
}

initializeStatistics();
