import { z } from "zod";

export const wishListEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const contactFormSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z
    .string()
    .regex(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .optional()
    .or(z.literal("")),
  message: z.string().min(1, "Message is required"),
});

export type WishListEmailInput = z.infer<typeof wishListEmailSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
