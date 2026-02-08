import { getDb } from "../database/mongodb.ts";
import { contactSchema } from "../database/models/contactSchema.ts";

export interface ContactData {
  fullName: string;
  email: string;
  mobile?: string;
  message: string;
  file?: {
    buffer: Buffer;
    mimetype: string;
    originalname: string;
  };
}

export class ContactService {
  static async processContactForm(data: ContactData) {
    try {
      const { fullName, email, mobile, message, file } = data;

      // ✅ Logic: Convert file to Base64
      let fileUrl = "";
      if (file) {
        const base64Data = file.buffer.toString("base64");
        fileUrl = `data:${file.mimetype};base64,${base64Data}`;
      }

      // ✅ Logic: Save to Database
      const db = await getDb("techsai");
      const Contact = db.models.contact || db.model("contact", contactSchema);

      const newContactEntry = new Contact({
        fullName,
        email,
        mobile,
        message,
        filename: file?.originalname,
        fileUrl,
      });

      const savedEntry = await newContactEntry.save();
      if (!savedEntry?._id) {
        return {
          success: false,
          message: "Failed to save contact message to database.",
          code: 500,
        };
      }

      return {
        success: true,
        message: "Contact message saved successfully.",
        data: savedEntry,
      };
    } catch (error) {
      console.error("Contact Service Error:", error);
      return {
        success: false,
        message: "An internal server error occurred.",
        code: 500,
      };
    }
  }
}
