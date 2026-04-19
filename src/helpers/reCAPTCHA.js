const { RecaptchaVerifier } = require("firebase/auth");
const { auth } = require("../lib/firebase");

const setupRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      },
      auth
    );
  }
};

module.exports = setupRecaptcha;