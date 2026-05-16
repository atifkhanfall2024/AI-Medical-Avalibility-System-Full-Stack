const express = require("express");
const CreateSafepayCheckout = require('../../controllers/payments/payment');
const ValidateToken = require("../../middleware/ValidationToken");
const VerifyPaymentSuccess = require("../../controllers/payments/verifyPayment");
const CancelPayment = require("../../controllers/payments/cancelPayment");


const Paymentrouter = express.Router();

Paymentrouter.post("/payment/create-checkout", ValidateToken , CreateSafepayCheckout);

Paymentrouter.post("/payment/cancel", ValidateToken, CancelPayment);
Paymentrouter.post("/payment/verify-success", ValidateToken, VerifyPaymentSuccess);

module.exports = Paymentrouter;