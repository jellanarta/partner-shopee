import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<void> {
  // Create a transporter using your email service credentials
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g., "smtp.gmail.com"
    port: Number(process.env.SMTP_PORT) || 587, // Default SMTP port
    secure: process.env.SMTP_SECURE === "true", // Use TLS if true
    auth: {
      user: process.env.SMTP_USER, // Your email address
      pass: process.env.SMTP_PASS, // Your email password or app-specific password
    },
  });

  // Send the email
  await transporter.sendMail({
    from: `"Your App Name" <${process.env.SMTP_USER}>`, // Sender address
    to, // Recipient address
    subject, // Subject line
    html, // HTML body
  });

  console.log(`Email sent to ${to}`);
}