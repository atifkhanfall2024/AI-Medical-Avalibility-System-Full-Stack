const safepay = require("../../lib/paymentConfig");
const PaymentModel = require("../../models/PaymentModel");

const plans = {
  basic: {
    name: "Basic Plan",
    amount: 499,
  },
  pro: {
    name: "Pro Plan",
    amount: 999,
  },
  premium: {
    name: "Premium Plan",
    amount: 1999,
  },
};

const CreateSafepayCheckout = async (req, res) => {
  try {
    const { plan } = req.body;

    const userId = req.user._id; 

    if (!plan) {
      return res.status(400).json({
        success: false,
        message: "Plan is required",
      });
    }

    if (!plans[plan]) {
      return res.status(400).json({
        success: false,
        message: "Invalid subscription plan",
      });
    }

    const selectedPlan = plans[plan];

    // 1. Create Safepay payment token
    const payment = await safepay.payments.create({
      amount: selectedPlan.amount,
      currency: "PKR",
    });

    console.log("Safepay payment:", payment);

    const token = payment?.token;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Payment token not received from Safepay",
        payment,
      });
    }

    // 2. Create unique order id
    const orderId = `AMAS-${Date.now()}-${userId}`;

    // 3. Create Safepay checkout URL
    const checkoutURL = safepay.checkout.create({
      token,
      orderId,
      cancelUrl: `${process.env.FRONTEND_URL}/payment-cancel`,
      redirectUrl: `${process.env.FRONTEND_URL}/payment-success?orderId=${orderId}&plan=${plan}`,
      source: "custom",
      webhooks: true,
    });

    // 4. Store payment in DB as pending
    const paymentRecord = await PaymentModel.create({
      userId,
      plan,
      amount: selectedPlan.amount,
      currency: "PKR",
      paymentGateway: "Safepay",
      safepayToken: token,
      orderId,
      checkoutURL,
      status: "pending",
      rawResponse: payment,
    });

    return res.status(200).json({
      success: true,
      message: "Checkout created successfully",
      checkoutURL,
      token,
      orderId,
      paymentId: paymentRecord._id,
      plan,
      amount: selectedPlan.amount,
    });
  } catch (error) {
    console.log("Safepay checkout error:", error);
    console.log("Safepay error response:", error?.response?.data);
    console.log("Safepay error message:", error?.message);

    return res.status(500).json({
      success: false,
      message: error?.message || "Payment checkout creation failed",
      error: error?.response?.data || error?.message,
    });
  }
};

module.exports = CreateSafepayCheckout;