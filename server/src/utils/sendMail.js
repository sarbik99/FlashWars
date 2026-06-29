import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // STARTTLS
  requireTLS: true,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

// Verify SMTP connection when the server starts
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Verification Failed");
    console.error(error);
  } else {
    console.log("✅ SMTP Server is ready");
  }
});

const sendMail = async (to, subject, text) => {
  try {
    console.log("--------------------------------");
    console.log("Sending email...");
    console.log("To:", to);
    console.log("From:", process.env.EMAIL_USER);
    console.log("EMAIL_USER exists:", !!process.env.EMAIL_USER);
    console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
    console.log("--------------------------------");

    const mailOptions = {
      from: `"FlashWars" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully");
    console.log(info.response);

    return {
      success: true,
      info,
    };
  } catch (error) {
    console.error("Email sending failed");
    console.error(error);

    return {
      success: false,
      error,
    };
  }
};

export { sendMail };