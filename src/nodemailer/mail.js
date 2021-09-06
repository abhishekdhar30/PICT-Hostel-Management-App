const nodeMailer = require("nodemailer");

//this code ois used to send email to the email which user entered
module.exports = function sendingMail(message) {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    // host: "smtp.gmail.com",
    // port: 465,
    // secure: false,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASSWORD,
    },
  });


  transporter.sendMail(message, function (error, data) {
    if (error) {
      console.log(error.message);
    } else {
      console.log("Email sent to", email);
    }
  });
};
