const { Safepay } = require("@sfpy/node-sdk");
require("dotenv").config();

const safepay = new Safepay({
  environment: process.env.SAFEPAY_ENV || "sandbox",
  apiKey: process.env.SAFEPAY_API_KEY,
  v1Secret: process.env.SAFEPAY_SECRET_KEY,
  webhookSecret: process.env.SAFEPAY_WEBHOOK_SECRET || "test",
});

module.exports  = safepay