const nodemailer = require("nodemailer");
const pug = require("pug");
const { convert } = require("html-to-text");

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `No reply <${process.env.EMAIL_FROM}>`;
  }

  mailTransporter() {
    try {
      if (process.env.NODE_ENV === "production") {
        return nodemailer.createTransport({
          host: process.env.PROD_EMAIL_HOST,
          port: process.env.PROD_EMAIL_PORT,
          auth: {
            user: process.env.PROD_EMAIL_USERNAME,
            pass: process.env.PROD_EMAIL_PASSWORD,
          },
        });
      } else {
        return nodemailer.createTransport({
          host: process.env.DEV_EMAIL_HOST,
          port: process.env.DEV_EMAIL_PORT,
          auth: {
            user: process.env.DEV_EMAIL_USERNAME,
            pass: process.env.DEV_EMAIL_PASSWORD,
          },
        });
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error setting up email transporter");
    }
  }

  async Send(template, subject) {
    try {
      const html = pug.renderFile(
        `${__dirname}/../Views/Emails/${template}.pug`,
        {
          firstName: this.firstName,
          email: this.to,
          url: this.url,
          subject,
        }
      );
      const emailText = convert(html);

      //! 2) Define email options
      const mailOptions = {
        from: this.from,
        to: this.to,
        subject,
        html,
        text: emailText,
      };

      //! 3) Create a transport and send email
      const email = await this.mailTransporter().sendMail(mailOptions);

      console.log("==== Responce from await mailTransport =====");
      console.log(email);

      return email;
    } catch (error) {
      console.log(error);
      throw new Error("Error sending email: ");
    }
  }

  async SendTestEmail() {
    await this.Send("Test", "This is a Test Email.");
  }
}

module.exports = { Email };
