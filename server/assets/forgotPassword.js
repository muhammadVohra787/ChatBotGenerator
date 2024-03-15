const nodemailer = require("nodemailer");
const sender_email = process.env.SENDER_EMAIL;
const sender_pass = process.env.SENDER_PASS;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: sender_email,
    pass: sender_pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
async function sendPasswordResetEmail(email, token) {
  console.log("Sending email to:", email);

  if (!email) {
    console.error("No recipient email address provided");
    return;
  }
  transporter.close();
  const mailOptions = {
    from: sender_email,
    to: email,
    subject: "Reset Your Password",
    html: `
      <p style="font-size: 30px; color: #333;font-weight: bold;">MV AUTH</p>
      <p style="font-size: 16px; color: #333;">This Code Expires in 20 minutes</p>
      <p style="font-size: 16px; color: #333;">Here is your verification code to reset your password:</p>
      <p style="font-size: 24px; color: #007bff; font-weight: bold;">${token}</p>
      <p style="font-size: 16px; color: #333;">If you did not request this, please ignore this email.</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending verification code email:", error);
    } else {
      console.log("Verification code email sent:", info.response);
      transporter.close()
    }
  });
}

module.exports = { sendPasswordResetEmail };
