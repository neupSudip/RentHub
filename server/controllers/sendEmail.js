const nodemailer = require("nodemailer");

const sendEmail = async (email, hash, id) => {
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
      subject: "Email Verification",
      html: `<h1>Please verify your email for RentHub.com by below link<h1/><br/><p>http://localhost:3000/verify/${id}/${hash}<p/>`,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
