import { getDb } from "../database/mongodb.ts";
import { contactSchema } from "../database/models/contactSchema.ts";
import { contactAdminTemplate } from "../utils/emailTemplates.ts";
import { sendMail } from "../utils/helper.ts";
import { withTimeout } from "../utils/withTimeout.ts";

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
    const { fullName, email, mobile, message, file } = data;

    // ✅ Logic: Convert file to Base64
    let fileUrl = "";
    if (file) {
      const base64Data = file.buffer.toString("base64");
      fileUrl = `data:${file.mimetype};base64,${base64Data}`;
    }

    // Send emails AFTER response
    await withTimeout(
      sendMail({
        to: process.env.SMTP_USER!,
        subject: `New Contact Request from ${fullName}`,
        html: contactAdminTemplate(
          fullName,
          email,
          mobile || "",
          message,
          !!file,
        ),
      }),
      7000,
    );

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
      throw new Error("Failed to save contact message to database.");
    }

    return savedEntry;
  }
}
