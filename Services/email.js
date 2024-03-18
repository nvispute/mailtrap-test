const nodemailer = require("nodemailer");
const pug = require("pug");
const { convert } = require("html-to-text");
const util = require("util");

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `No reply <${process.env.EMAIL_FROM}>`;
    this.transporter = this.createTransport();
  }

  createTransport() {
    const transporterOptions = {
      host:
        process.env.NODE_ENV === "production"
          ? process.env.PROD_EMAIL_HOST
          : process.env.DEV_EMAIL_HOST,
      port:
        process.env.NODE_ENV === "production"
          ? process.env.PROD_EMAIL_PORT
          : process.env.DEV_EMAIL_PORT,
      secure: false, // Assuming not using SSL in this case
    };

    if (process.env.NODE_ENV === "production") {
      transporterOptions.auth = {
        user: process.env.PROD_EMAIL_USERNAME,
        pass: process.env.PROD_EMAIL_PASSWORD,
      };
    } else {
      transporterOptions.auth = {
        user: process.env.DEV_EMAIL_USERNAME,
        pass: process.env.DEV_EMAIL_PASSWORD,
      };
    }

    return nodemailer.createTransport(transporterOptions);
  }
  async send(template, subject, category) {
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

      const mailOptions = {
        from: this.from,
        to: this.to,
        subject,
        html,
        text: emailText,
        headers: {
          "X-MT-Category": category, // Add X-MT-Category header
        },
      };

      const sendMail = util
        .promisify(this.transporter.sendMail)
        .bind(this.transporter);
        
      const result = await sendMail(mailOptions);
      console.log("==== Response from sendMail ====");
      console.log(result);

      if (result.accepted.length > 0) {
        return result;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Error sending email");
    }
  }

  async sendTestEmail() {
    try {
      const result = await this.send(
        "Test",
        "This is a Test Email.",
        "Test Category"
      );
      return result;
    } catch (error) {
      console.error("Error sending test email:", error);
      throw new Error("Error sending test email");
    }
  }
}

module.exports = { Email };
