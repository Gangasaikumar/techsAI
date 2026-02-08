import { getDb } from "../database/mongodb.ts";
import { contactSchema } from "../database/models/contactSchema.ts";
import { wishListSchema } from "../database/models/wishListSchema.ts";
import {
  contactAdminTemplate,
  notifyAdminTemplate,
  userConfirmationTemplate,
} from "../utils/emailTemplates.ts";
import { sendMail } from "./mailService.ts";

const processCron = async () => {
  // Get arguments
  const args = process.argv.slice(2);
  const typeArg = args.find((arg) => arg.startsWith("--type="))?.split("=")[1];

  console.log(
    `🚀 Starting Email Cron Job${typeArg ? ` (Type: ${typeArg})` : ""}...`,
  );
  const db = await getDb("techsai");

  try {
    // 1. Process Pending Contact Records
    if (!typeArg || typeArg === "contacts") {
      const Contact = db.models.contact || db.model("contact", contactSchema);
      const pendingContacts = await Contact.find({ status: "pending" });

      console.log(`Found ${pendingContacts.length} pending contact records.`);

      for (const contact of pendingContacts) {
        try {
          await sendMail({
            to: process.env.SMTP_USER!,
            subject: `New Contact Request from ${contact.fullName}`,
            html: contactAdminTemplate(
              contact.fullName,
              contact.email,
              contact.mobile || "",
              contact.message,
              !!contact.fileUrl,
            ),
          });

          contact.status = "replied";
          await contact.save();
          console.log(`✅ Processed contact for ${contact.email}`);
        } catch (err) {
          console.error(
            `❌ Failed to process contact for ${contact.email}:`,
            err,
          );
        }
      }
    }

    // 2. Process Pending Wishlist Records
    if (!typeArg || typeArg === "wishlist") {
      const Wishlist =
        db.models.wishlist || db.model("wishlist", wishListSchema);
      const pendingWishlist = await Wishlist.find({ status: "pending" });

      console.log(`Found ${pendingWishlist.length} pending wishlist records.`);

      for (const entry of pendingWishlist) {
        try {
          const countdown = calculateCountdown(new Date("2026-06-04T00:00:00"));

          // Admin notification
          await sendMail({
            to: process.env.SMTP_USER!,
            subject: "New Wishlist Subscriber",
            html: notifyAdminTemplate(entry.email),
          });

          // User confirmation
          await sendMail({
            to: entry.email,
            subject: "Congratulations! You're on the TechsAI wishlist 🎉",
            html: userConfirmationTemplate(entry.email, countdown),
          });

          entry.status = "replied";
          await entry.save();
          console.log(`✅ Processed wishlist for ${entry.email}`);
        } catch (err) {
          console.error(
            `❌ Failed to process wishlist for ${entry.email}:`,
            err,
          );
        }
      }
    }

    console.log("✅ Cron Job Finished Successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Critical error in cron job:", error);
    process.exit(1);
  }
};

const calculateCountdown = (target: Date) => {
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  let months =
    (target.getFullYear() - now.getFullYear()) * 12 +
    (target.getMonth() - now.getMonth());
  if (target.getDate() < now.getDate()) months--;

  const tempDate = new Date(now);
  tempDate.setMonth(now.getMonth() + months);
  const remainingDiff = target.getTime() - tempDate.getTime();

  return {
    months: Math.max(0, months),
    days: Math.floor(remainingDiff / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (remainingDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    ),
  };
};

processCron();
