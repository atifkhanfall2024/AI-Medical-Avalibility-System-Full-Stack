const PaymentModel = require("../../models/PaymentModel");

const CancelPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "orderId is required",
      });
    }

    const payment = await PaymentModel.findOneAndUpdate(
      { orderId, status: "pending" },
      { status: "cancelled" },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Payment cancelled",
      payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = CancelPayment;