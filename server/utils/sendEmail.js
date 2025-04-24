const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      debug: true,
      logger: true,
    });

    console.log(
      `Attempting to send email to ${email} using ${process.env.SMTP_USER}`
    );

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: subject,
      text: text,
    });

    console.log("Email sent successfully to:", email);
    return true;
  } catch (error) {
    console.log("Error sending mail to", email);
    console.error("Detailed error:", error);
    throw error;
  }
};

module.exports = sendEmail;
