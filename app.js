const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const express = require("express");
const app = express();
const { Email } = require("./Services/email");

app.post("/testemail", async (req, res, next) => {
  const user = {
    name: "Nishant S Vispute",
    // email: "nvispute@getbazzar.in",
    email: ["nvispute@gmail.com", "nvispute@getbazzar.in"],
    // email: "any-gmail-address@gmail.com",
  };
  const url = `${req.protocol}://${req.get(
    "host"
  )}/resetPassword/tokenGoesHere`;

  try {

    const emailInstance = new Email(user, url);
    const result = await emailInstance.sendTestEmail();
    if (result.response.split(" ")[0] === "250") {
      console.log("Email sent successfully:");
    }
  } catch (error) {
    // If there's an error sending the email
    console.error("Error sending email:", error);
  }

  res.status(200).json({
    status: "Success",
    message: "Email test route reached...",
  });
});

app.listen("5050", () => {
  console.log("✅  APP LOADED...");
  console.log("✅  STARTING THE SERVER...");
  console.log(`✅  APPLICATION ONLINE ON 'http://localhost:5050'`);
});
