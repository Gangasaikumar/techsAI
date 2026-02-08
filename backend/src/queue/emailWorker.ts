import { Worker } from "bullmq";
import { redis } from "./redis.ts";
import { sendMail } from "../utils/mailer.ts";
import {
  notifyAdminTemplate,
  contactAdminTemplate,
  userConfirmationTemplate,
} from "../utils/emailTemplates.ts";
import type { EmailJob } from "./emailJob.ts";

console.log("📨 Email worker started");

new Worker(
  "email-queue",
  async (job) => {
    const data = job.data as EmailJob;

    switch (data.type) {
      case "WISHLIST": {
        const { userEmail, countdown } = data.payload;

        // Admin mail
        await sendMail({
          to: process.env.SMTP_USER!,
          subject: "New Wishlist Subscriber",
          html: notifyAdminTemplate(userEmail),
        });

        // User mail
        await sendMail({
          to: userEmail,
          subject: "Welcome to TechsAI 🎉",
          html: userConfirmationTemplate(userEmail, countdown),
        });

        break;
      }

      case "CONTACT": {
        const { fullName, email, mobile, message, hasAttachment } =
          data.payload;

        await sendMail({
          to: process.env.SMTP_USER!,
          subject: `New Contact Request from ${fullName}`,
          html: contactAdminTemplate(
            fullName,
            email,
            mobile || "",
            message,
            hasAttachment,
          ),
        });

        break;
      }

      default:
        throw new Error("Unknown email job type");
    }

    console.log(`📧 Email job ${job.id} completed`);
  },
  {
    connection: redis,
    concurrency: 2,
  },
);
