require("dotenv").config();
const nodemailer = require("nodemailer");

function createTransporter(config) {
  let transporter = nodemailer.createTransport(config);
  return transporter;
}

const defaultConfig = {
  service: "gmail",
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.EMAIL_PASS,
  },
};

module.exports = {
  sendMail: async (email) => {
    const transporter = createTransporter(defaultConfig);
    await transporter.verify();
    await transporter.sendMail(email);
  },
};
