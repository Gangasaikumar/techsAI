import { getDb } from "../database/mongodb.ts";
import { contactSchema } from "../database/models/contactSchema.ts";
import { wishListSchema } from "../database/models/wishListSchema.ts";
import {
  contactAdminTemplate,
  notifyAdminTemplate,
  userConfirmationTemplate,
} from "../utils/emailTemplates.ts";
import { sendMail } from "./mailService.ts";

/* ------------------------------------------------ */
/* 1️⃣ Validate required secrets (NO .env) */
/* ------------------------------------------------ */
const REQUIRED_ENVS = [
  "MONGO_URI",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
];

for (const key of REQUIRED_ENVS) {
  if (!process.env[key]) {
    console.error(`❌ Missing required secret: ${key}`);
    process.exit(1);
  }
}

/* ------------------------------------------------ */
/* 2️⃣ Cron runner */
/* ------------------------------------------------ */
const processCron = async () => {
  const args = process.argv.slice(2);
  const typeArg = args.find((a) => a.startsWith("--type="))?.split("=")[1];

  console.log(`🚀 Email Cron Started${typeArg ? ` [${typeArg}]` : ""}`);
  console.log("🕒 Time:", new Date().toISOString());

  try {
    const db = await getDb("techsai");

    /* ---------------- CONTACTS ---------------- */
    if (!typeArg || typeArg === "contacts") {
      const Contact = db.models.contact || db.model("contact", contactSchema);

      const pending = await Contact.find({ status: "pending" });
      console.log(`📩 Pending contacts: ${pending.length}`);

      for (const contact of pending) {
        try {
          await sendMail({
            to: process.env.SMTP_USER as string,
            subject: `New Contact Request from ${contact.fullName}`,
            html: contactAdminTemplate(
              contact.fullName,
              contact.email,
              contact.mobile || "",
              contact.message,
              Boolean(contact.fileUrl),
            ),
          });

          contact.status = "replied";
          await contact.save();

          console.log(`✅ Contact done: ${contact.email}`);
        } catch (err) {
          console.error(`❌ Contact failed: ${contact.email}`, err);
        }
      }
    }

    /* ---------------- WISHLIST ---------------- */
    if (!typeArg || typeArg === "wishlist") {
      const Wishlist =
        db.models.wishlist || db.model("wishlist", wishListSchema);

      const pending = await Wishlist.find({ status: "pending" });
      console.log(`🎯 Pending wishlist: ${pending.length}`);

      for (const entry of pending) {
        try {
          const countdown = calculateCountdown(new Date("2026-06-04T00:00:00"));

          await sendMail({
            to: process.env.SMTP_USER as string,
            subject: "New Wishlist Subscriber",
            html: notifyAdminTemplate(entry.email),
          });

          await sendMail({
            to: entry.email,
            subject: "You're on the TechsAI wishlist 🎉",
            html: userConfirmationTemplate(entry.email, countdown),
          });

          entry.status = "replied";
          await entry.save();

          console.log(`✅ Wishlist done: ${entry.email}`);
        } catch (err) {
          console.error(`❌ Wishlist failed: ${entry.email}`, err);
        }
      }
    }

    console.log("🎉 Cron completed successfully");
    process.exit(0);
  } catch (err) {
    console.error("🔥 Cron crashed:", err);
    process.exit(1);
  }
};

/* ------------------------------------------------ */
/* 3️⃣ Countdown helper */
/* ------------------------------------------------ */
const calculateCountdown = (target: Date) => {
  const now = new Date();

  let months =
    (target.getFullYear() - now.getFullYear()) * 12 +
    (target.getMonth() - now.getMonth());

  if (target.getDate() < now.getDate()) months--;

  const temp = new Date(now);
  temp.setMonth(now.getMonth() + months);

  const diff = target.getTime() - temp.getTime();

  return {
    months: Math.max(0, months),
    days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
    hours: Math.max(
      0,
      Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    ),
  };
};

/* ------------------------------------------------ */
processCron();
