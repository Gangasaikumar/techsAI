import type { Request, Response } from "express";
import multer from "multer";
import {
  wishListEmailSchema,
  contactFormSchema,
} from "../validation/validation.ts";
import { ContactService } from "../services/contactService.ts";
import { WishlistService } from "../services/wishlistService.ts";

// ✅ Multer configuration for memory storage (Base64)
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export const contactUpload = upload.single("file");

/* -------------------------- CONTACT CONTROLLER -------------------------- */
export const contactController = async (req: Request, res: Response) => {
  try {
    const parsed = contactFormSchema.safeParse(req.body);

    if (!parsed.success) {
      const invalid = parsed.error.issues.map((issue) => issue.path.join("."));
      return res.status(400).json({
        success: false,
        message: `Invalid input: missing or invalid fields ${invalid.join(", ")}`,
      });
    }

    const savedEntry = await ContactService.processContactForm({
      ...parsed.data,
      file: req.file
        ? {
            buffer: req.file.buffer,
            mimetype: req.file.mimetype,
            originalname: req.file.originalname,
          }
        : undefined,
    });

    return res.status(201).json({
      success: true,
      message: "Contact message sent successfully.",
      data: savedEntry,
    });
  } catch (error: unknown) {
    console.error("Contact error:", error);
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    });
  }
};

/* -------------------------- WISHLIST CONTROLLER -------------------------- */
export const wishlistController = async (req: Request, res: Response) => {
  try {
    const parsed = wishListEmailSchema.safeParse(req.body);

    if (!parsed.success) {
      const invalid = parsed.error.issues.map((issue) => issue.path.join("."));
      return res.status(400).json({
        success: false,
        message: `Invalid input: missing or invalid fields ${invalid.join(", ")}`,
      });
    }

    const { email } = parsed.data;
    const savedEntry = await WishlistService.addToWishlist(email);

    return res.status(201).json({
      success: true,
      message: "Email added to wishlist successfully.",
      data: savedEntry,
    });
  } catch (error: unknown) {
    console.error("Wishlist error:", error);
    const status =
      (error as Error).message === "Email already in wishlist." ? 409 : 500;
    return res.status(status).json({
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    });
  }
};
