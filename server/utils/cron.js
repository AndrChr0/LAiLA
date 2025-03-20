import { CronJob } from "cron";
import { checkFeedbackProgress } from "../controller/feedbackController.js";

export const job = new CronJob(
  "59 11 * * 5", // every Friday at 11:59 AM
  async () => {
    await checkFeedbackProgress(); // onTick
  },
  null, // onComplete
  true, // start
  "Europe/Berlin" // timezone
);
