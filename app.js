const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(bodyParser.json());

// Replace these values with your credentials
const WORK_EMAIL = "nodemailwork@gmail.com";
const APP_PASSWORD = "lxmu pkhj wdsq siet";
const PERSONAL_EMAIL = "Mathankumar1902@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail", // Adjust based on your email provider
  auth: {
    user: WORK_EMAIL,
    pass: APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("All fields are required.");
  }

  const mailOptions = {
    from: WORK_EMAIL,
    to: PERSONAL_EMAIL,
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <div style="font-family: 'Times New Roman', serif;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Failed to send email.");
    }
    res.status(200).send("Email sent successfully!");
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
