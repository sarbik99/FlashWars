import dotenv from "dotenv";
import { BrevoClient } from "@getbrevo/brevo";

dotenv.config({
  path: "./.env",
});

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

const sendMail = async (to, subject, text) => {
  try {
    console.log("--------------------------------");
    console.log("Sending email via Brevo...");
    console.log("To:", to);
    console.log("--------------------------------");

    const response = await brevo.transactionalEmails.sendTransacEmail({
      sender: {
        name: "FlashWars",
        email: process.env.BREVO_SENDER_EMAIL,
      },
      to: [
        {
          email: to,
        },
      ],
      subject,
      textContent: text,
    });

    console.log("Email sent!");
    console.log(response);

    return {
      success: true,
      info: response,
    };
  } catch (err) {
    console.error("Brevo Error:");
    console.error(err);

    return {
      success: false,
      error: err,
    };
  }
};

export { sendMail };