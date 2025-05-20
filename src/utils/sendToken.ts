import config from "@/config/config";
import nodemailer from "nodemailer";
import { Token } from "nodemailer/lib/xoauth2";

export async function sendToken(email: string, token: string) {
  // Create a test account or replace with real credentials.
  const transporter = nodemailer.createTransport({
    host: config.SMTP_EMAIL,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.EMAIL,
      pass: config.PASSWORD_EMAIL,
    },
  });
  const info = await transporter.sendMail({
    from: config.EMAIL,
    to: email,
    subject: "Reset Password", // Subject line
    text: "klik", // plain‑text body
    html: `<p>
    <a href="${config.URL_WEB}/reset-password?token=${token}">Reset Password</a>
    </p>`, // HTML body
  });
}
