import { getDb } from "../database/mongodb.ts";
import { emailQueue } from "../queue/emailQueue.ts";
import type { EmailJob } from "../queue/emailJob.ts";
import { wishListSchema } from "../database/models/wishListSchema.ts";

export class WishlistService {
  static async addToWishlist(email: string) {
    const db = await getDb("techsai");
    const Wishlist = db.models.wishlist || db.model("wishlist", wishListSchema);

    const existing = await Wishlist.findOne({ email });
    if (existing) {
      throw new Error("Email already in wishlist.");
    }

    const savedEntry = await new Wishlist({ email }).save();

    const countdown = this.calculateCountdown(new Date("2026-06-04T00:00:00"));

    // Enqueue email job
    const job: EmailJob = {
      type: "WISHLIST",
      payload: {
        userEmail: email,
        countdown,
      },
    };

    await emailQueue.add("email-job", job);

    return savedEntry;
  }

  private static calculateCountdown(target: Date) {
    const now = new Date();
    const diff = target.getTime() - now.getTime();

    return {
      months: Math.floor(diff / (1000 * 60 * 60 * 24 * 30)),
      days: Math.floor((diff / (1000 * 60 * 60 * 24)) % 30),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    };
  }
}
