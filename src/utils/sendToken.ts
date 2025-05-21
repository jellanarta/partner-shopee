import config from "@/config/config";
import nodemailer from "nodemailer";

export async function sendToken(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: config.SMTP_EMAIL,
    port: 587,
    secure: false,
    auth: {
      user: config.EMAIL,
      pass: config.PASSWORD_EMAIL,
    },
  });

  await transporter.sendMail({
    from: config.EMAIL,
    to: email,
    subject: "Reset Password",
    text: "klik",
    html: `<p><a href="${config.URL_WEB}/reset-password?token=${token}">Reset Password</a></p>`,
  });
}
