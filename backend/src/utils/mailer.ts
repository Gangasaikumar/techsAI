import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },

  pool: true,
  maxConnections: 1,
  maxMessages: 20,
  rateLimit: 2,
});

transporter.verify((err) => {
  if (err) {
    console.error("❌ SMTP failed", err);
  } else {
    console.log("✅ SMTP ready");
  }
});

export const sendMail = async (mail: {
  to: string;
  subject: string;
  html: string;
}) => {
  return transporter.sendMail({
    from: `"TechsAI" <${process.env.SMTP_USER}>`,
    ...mail,
  });
};
