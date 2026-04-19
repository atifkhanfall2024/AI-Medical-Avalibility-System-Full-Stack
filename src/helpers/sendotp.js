const { signInWithPhoneNumber } = require("firebase/auth");
const { auth } = require("../lib/firebase");

const sendOTP = async (phone) => {
  const appVerifier = window.recaptchaVerifier;

  if (!appVerifier) {
    throw new Error("Recaptcha not initialized");
  }

  const confirmationResult = await signInWithPhoneNumber(
    auth,
    phone,
    appVerifier
  );

  window.confirmationResult = confirmationResult;

  return confirmationResult;
};

module.exports = sendOTP;