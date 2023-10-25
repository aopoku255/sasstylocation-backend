/* eslint-disable */
const nodemailer = require("nodemailer");
require("dotenv").config()

const sendMail = (email, mailBody) =>
  new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.EMAIL_PASS,
      },
      secure: true,
      tls: {
        servername: "gmail.com",
      },
      attachments: [
        {
          filename: "_PUPs Terms.pdf", // Use the original file name
          path: __dirname + "/_PUPs Terms.pdf", // Get the file path from multer
        },
      ],
    });

    // write a function to send the mail


    const mailOptions = {
      from: "Sassty <noreply@gmail.com>",
      to: email,
      subject: "Welcome to Sassty",
      html: mailBody,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        reject(error);
      }
      resolve("ok");
    });
  });

module.exports = sendMail;
