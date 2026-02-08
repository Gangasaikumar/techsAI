import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT), // 587 recommended
  secure: true, // port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },

  // 🔥 PERFORMANCE OPTIMIZATIONS
  pool: true, // reuse connections
  maxConnections: 1, // parallel SMTP connections
  maxMessages: 20, // reuse before reconnect
  rateLimit: 2, // avoid provider throttling
  tls: {
    rejectUnauthorized: true,
  },
});

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export const sendMail = async ({
  to,
  subject,
  html,
  replyTo,
}: SendMailOptions) => {
  return transporter.sendMail({
    from: `"TechsAI" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    replyTo,
  });
};
