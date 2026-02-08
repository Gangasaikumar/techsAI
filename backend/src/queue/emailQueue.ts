import { Queue } from "bullmq";
import { redis } from "./redis.ts";

export const emailQueue = new Queue("email-queue", {
  connection: redis,
  defaultJobOptions: {
    attempts: 5,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});
