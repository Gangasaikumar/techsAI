import { getDb } from "../database/mongodb.ts";
import { contactSchema } from "../database/models/contactSchema.ts";
import { emailQueue } from "../queue/emailQueue.ts";
import type { EmailJob } from "../queue/emailJob.ts";

export class ContactService {
  static async processContactForm(data: {
    fullName: string;
    email: string;
    mobile?: string;
    message: string;
    file?: {
      buffer: Buffer;
      mimetype: string;
      originalname: string;
    };
  }) {
    const { fullName, email, mobile, message, file } = data;

    // Save file (optional)
    let fileUrl = "";
    if (file) {
      const base64 = file.buffer.toString("base64");
      fileUrl = `data:${file.mimetype};base64,${base64}`;
    }

    // Save DB FIRST
    const db = await getDb("techsai");
    const Contact = db.models.contact || db.model("contact", contactSchema);

    const savedEntry = await new Contact({
      fullName,
      email,
      mobile,
      message,
      filename: file?.originalname,
      fileUrl,
    }).save();

    // Enqueue email job (🔥 key change)
    const job: EmailJob = {
      type: "CONTACT",
      payload: {
        fullName,
        email,
        mobile,
        message,
        hasAttachment: !!file,
      },
    };

    await emailQueue.add("email-job", job);

    return savedEntry;
  }
}
