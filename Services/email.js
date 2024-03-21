const nodemailer = require("nodemailer");
const pug = require("pug");
const { convert } = require("html-to-text");
const util = require("util");

class Email {
  constructor(user, url) {
    //?  Log the initialization of the Email service
    console.info("[INFO] Init Email Constructor");

    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `No reply <${process.env.EMAIL_FROM}>`;
    this.transporter = this.createTransport();

    //? Log the successful creation of the Email instance
    console.info("[INFO] Email Service Initialized successfully.");
  }

  createTransport() {
    //? Log the creation of the email transporter
    console.info("[INFO] Creating Email Transporter...");

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

    //? Log the successful creation of the transporter
    console.info("[INFO] Email Transporter Created successfully.");
    return nodemailer.createTransport(transporterOptions);
  }
  async send(template, subject, category) {
    //? Log the start of email sending process
    console.info("[INFO] Starting Email Sending Process...");

    try {
      //? Log the Creating Email Template
      console.info("[INFO] Creating Email Template...");
      const html = pug.renderFile(
        `${__dirname}/../Views/Emails/${template}.pug`,
        {
          firstName: this.firstName,
          email: this.to,
          url: this.url,
          subject,
        }
      );

      //? Log the Converting Email HTML to Text
      console.info("[INFO] Converting Email HTML to Text...");
      const emailText = convert(html);

      //? Log the Configuring Email Sending Options
      console.info("[INFO] Configuring Email Sending Options...");
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

      // Log the start of email sending process
      console.log("[INFO] Sending Configured Email...");

      const result = await sendMail(mailOptions);

      //? Log the response after sending the email
      console.log("[INFO] Email Sent Successfully:", result);

      if (result.accepted.length > 0) {
        return result;
      } else {
        return false;
      }
    } catch (error) {
      //! Log any errors that occur during sending test email
      console.error("[ERROR] Error sending email:", error);
      throw new Error(error);
    }
  }

  async sendTestEmail() {
    try {
      // Log the start of sending test email
      console.log("[INFO] Sending Test Email...");
      const result = await this.send(
        "Test",
        "This is a Test Email.",
        "Test Category"
      );

      // Log a success message after the test email is sent
      console.log("[INFO] Test Email Sent Successfully:", result);
      return result;
    } catch (error) {
      // Log any errors that occur during sending test email
      console.error("[ERROR] Error sending test email:", error);
      throw new Error("Error sending test email");
    }
  }
}

module.exports = { Email };
