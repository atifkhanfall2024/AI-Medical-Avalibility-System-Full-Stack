const express = require("express");
const CreateSafepayCheckout = require('../../controllers/payments/payment');
const ValidateToken = require("../../middleware/ValidationToken");


const Paymentrouter = express.Router();

Paymentrouter.post("/payment/create-checkout", ValidateToken , CreateSafepayCheckout);

module.exports = Paymentrouter;