import type { Request, Response } from "express";
import multer from "multer";
import {
  wishListEmailSchema,
  contactFormSchema,
} from "../validation/validation.ts";
import { ContactService } from "../services/contactService.ts";
import { WishlistService } from "../services/wishlistService.ts";

/* -------------------------- MULTER SETUP -------------------------- */

// Memory storage (file handled in service layer)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export const contactUpload = upload.single("file");

/* -------------------------- CONTACT CONTROLLER -------------------------- */
export const contactController = async (req: Request, res: Response) => {
  try {
    // ✅ Validate request body
    const parsed = contactFormSchema.safeParse(req.body);

    if (!parsed.success) {
      const invalidFields = parsed.error.issues.map((issue) =>
        issue.path.join("."),
      );

      return res.status(400).json({
        success: false,
        message: `Invalid input: ${invalidFields.join(", ")}`,
      });
    }

    // ✅ Call service (DB save + BullMQ enqueue)
    await ContactService.processContactForm({
      ...parsed.data,
      file: req.file
        ? {
            buffer: req.file.buffer,
            mimetype: req.file.mimetype,
            originalname: req.file.originalname,
          }
        : undefined,
    });

    // ✅ Respond immediately (email happens in worker)
    return res.status(201).json({
      success: true,
      message: "Contact message received successfully.",
    });
  } catch (error) {
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
    // ✅ Validate request body
    const parsed = wishListEmailSchema.safeParse(req.body);

    if (!parsed.success) {
      const invalidFields = parsed.error.issues.map((issue) =>
        issue.path.join("."),
      );

      return res.status(400).json({
        success: false,
        message: `Invalid input: ${invalidFields.join(", ")}`,
      });
    }

    const { email } = parsed.data;

    // ✅ Call service (DB save + BullMQ enqueue)
    await WishlistService.addToWishlist(email);

    // ✅ Respond immediately
    return res.status(201).json({
      success: true,
      message: "Email added to wishlist successfully.",
    });
  } catch (error) {
    console.error("Wishlist error:", error);

    const statusCode =
      error instanceof Error && error.message === "Email already in wishlist."
        ? 409
        : 500;

    return res.status(statusCode).json({
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    });
  }
};
