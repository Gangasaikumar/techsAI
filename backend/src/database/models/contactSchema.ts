import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: false },
    message: { type: String, required: true },
    filename: { type: String, required: false }, // Store filename if a file was uploaded
    fileUrl: { type: String, required: false }, // Optional: Store a URL if hosted
    status: { type: String, enum: ["pending", "replied"], default: "pending" },
  },
  { timestamps: true, versionKey: false },
);

export { contactSchema };
