const nodemailer = require("nodemailer");

const sendEmail = async (email, html, subject) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: subject,
      html: html,
    });
  } catch (error) {
    console.log("error .................", error);
  }
};

module.exports = sendEmail;
