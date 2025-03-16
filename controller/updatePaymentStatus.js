const UserModel = require("../modules/userSchema");

async function updatePaymentStatusController(req, res) {
    try {
        const { paymentId } = req.params;
        const { status } = req.body;

        // Validate required fields
        if (!status) {
            throw new Error("Status is required");
        }

        // Validate status value
        const validStatuses = ['pending', 'approved', 'rejected'];
        if (!validStatuses.includes(status)) {
            throw new Error("Invalid status. Allowed values: pending, approved, rejected");
        }

        // Find the user who has the payment
        const user = await UserModel.findOne({ 'payments._id': paymentId });

        if (!user) {
            throw new Error("Payment not found");
        }

        // Find the payment in the user's payments array
        const payment = user.payments.id(paymentId);
        if (!payment) {
            throw new Error("Payment not found");
        }

        // Update the payment status
        payment.status = status;

        // Save the updated user document
        await user.save();

        // Respond with the updated payment
        res.status(200).json({
            data: payment,
            message: "Payment status updated successfully",
            error: false,
            success: true,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = updatePaymentStatusController;