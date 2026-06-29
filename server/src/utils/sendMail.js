import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

// Debug environment variables
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

// Create transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 30000, // 30 seconds
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

// Verify SMTP connection when server starts
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP VERIFY FAILED");
    console.error(error);
  } else {
    console.log("SMTP SERVER READY");
  }
});

// Send mail
const sendMail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    console.log(`Sending email to ${to}...`);

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);

    return {
      success: true,
      info,
    };
  } catch (error) {
    console.error("Email sending failed:");
    console.error(error);

    return {
      success: false,
      error,
    };
  }
};

export { sendMail };