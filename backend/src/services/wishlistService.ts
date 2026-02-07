import { getDb } from "../database/mongodb.ts";
import { wishListSchema } from "../database/models/wishListSchema.ts";
import {
  notifyAdminTemplate,
  userConfirmationTemplate,
} from "../utils/emailTemplates.ts";
import { sendMail } from "../utils/helper.ts";

export class WishlistService {
  static async addToWishlist(email: string) {
    const db = await getDb("techsai");
    const Wishlist = db.models.wishlist || db.model("wishlist", wishListSchema);

    // ✅ Logic: Duplicate Check
    const existingEntry = await Wishlist.findOne({ email });
    if (existingEntry) {
      throw new Error("Email already in wishlist.");
    }

    // ✅ Logic: Countdown Calculation (June 4, 2026)
    const countdown = this._calculateCountdown(new Date("2026-06-04T00:00:00"));

    // Send emails AFTER response
    await sendMail({
      to: process.env.SMTP_USER!,
      subject: "New Wishlist Subscriber",
      html: notifyAdminTemplate(email),
    });
    await sendMail({
      to: email,
      subject: "Congratulations! You're on the TechsAI wishlist 🎉",
      html: userConfirmationTemplate(email, countdown),
    });

    // ✅ Logic: Persistence
    const newWishlistEntry = new Wishlist({
      email,
    });

    const savedEntry = await newWishlistEntry.save();
    if (!savedEntry?._id) {
      throw new Error("Failed to save to wishlist database.");
    }

    return savedEntry;
  }

  private static _calculateCountdown(target: Date) {
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
  }
}
