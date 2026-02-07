import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

const sendMail = async ({ to, subject, html, replyTo }: SendMailOptions) => {
  return transporter.sendMail({
    from: `"Techsai" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    replyTo,
  });
};

export { sendMail };
