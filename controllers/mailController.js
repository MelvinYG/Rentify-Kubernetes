import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async (req, res) => {
  const { fromEmail, toEmail, listingTitle } = req.body;
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: toEmail,
    subject: `Interest in listing ${listingTitle} from Rentify`,
    text: `I would like to get connected for more informations on your listing.\nContact me @ ${fromEmail}\nThank you`
  }
  const mailOptionsForSender = {
    from: process.env.SMTP_MAIL,
    to: fromEmail,
    subject: `Interest in listing ${listingTitle} from Rentify`,
    text: `Interest notified to ${toEmail}`
  }
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(`Message sent successfully to ${toEmail}`);
    }
  });
  await transporter.sendMail(mailOptionsForSender, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(`Message sent successfully to ${fromEmail}`);
    }
  });
}