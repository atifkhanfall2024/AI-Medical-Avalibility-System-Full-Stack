const PaymentModel = require("../../models/PaymentModel");

const VerifyPaymentSuccess = async (req, res) => {
  try {
    let { orderId } = req.body;

    console.log("Verify payment API hit");
    console.log("Raw orderId:", orderId);

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "orderId is required",
      });
    }

    orderId = orderId.trim();

    console.log("Clean orderId:", orderId);

    const payment = await PaymentModel.findOne({ orderId });

    console.log("Payment found:", payment);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
        receivedOrderId: orderId,
      });
    }

    const startDate = new Date();
    const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    payment.status = "paid";
    payment.subscriptionStartDate = startDate;
    payment.subscriptionEndDate = endDate;

    await payment.save();

    return res.status(200).json({
      success: true,
      message: "Payment verified and subscription activated",
      payment,
    });
  } catch (error) {
    console.log("Verify payment error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Payment verification failed",
    });
  }
};

module.exports = VerifyPaymentSuccess;