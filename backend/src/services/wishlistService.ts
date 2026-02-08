import { getDb } from "../database/mongodb.ts";
import { wishListSchema } from "../database/models/wishListSchema.ts";

export class WishlistService {
  static async addToWishlist(email: string) {
    try {
      const db = await getDb("techsai");
      const Wishlist =
        db.models.wishlist || db.model("wishlist", wishListSchema);

      // ✅ Logic: Duplicate Check
      const existingEntry = await Wishlist.findOne({ email });
      if (existingEntry) {
        return {
          success: false,
          message: "Email already in wishlist.",
          code: 409,
        };
      }

      // ✅ Logic: Persistence
      const newWishlistEntry = new Wishlist({
        email,
      });

      const savedEntry = await newWishlistEntry.save();
      if (!savedEntry?._id) {
        return {
          success: false,
          message: "Failed to save to wishlist database.",
          code: 500,
        };
      }

      return {
        success: true,
        message: "Email added to wishlist successfully.",
        data: savedEntry,
      };
    } catch (error) {
      console.error("Wishlist Service Error:", error);
      return {
        success: false,
        message: "An internal server error occurred.",
        code: 500,
      };
    }
  }
}
