const transporter = require("../../lib/mailer");

const sendOtp = async (email, otp) => {
  try {
    const mailOptions = {
      from: `AI Medicine Availability System`,
      to: email,
      subject: "Your AMAS OTP Code",
      html: `
        <div style="font-family: Arial; padding: 10px;">
          <h2>AMAS Verification</h2>
          <p>Your OTP code is:</p>
          <h1 style="color: #2563eb">${otp}</h1>
          <p>This OTP will expire in 5 minutes.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    return info;
  } catch (error) {
    console.log("Send OTP Error:", error);
    throw new Error("Failed to send OTP email");
  }
};

module.exports = sendOtp;