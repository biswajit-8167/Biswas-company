const UserModel = require("../modules/userSchema");

async function createPaymentController(req, res) {
    try {
        const { amount, image, dueAmount } = req.body;

        // Validate required fields
        if (!amount || !image || !dueAmount) {
            throw new Error("Amount and image are required");
        }

        // Validate amount is a positive number
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error("Amount must be a positive number");
        }

        // Get the user ID from the authenticated request
        const userId = req.user._id;

        // Create a new payment object
        const newPayment = {
            amount,
            image,
            dueAmount,
            status: 'pending', // Default status
        };

        // Find the user and add the payment to their payments array
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $push: { payments: newPayment } },
            { new: true } // Return the updated document
        ).select('-password'); // Exclude the password field

        if (!updatedUser) {
            throw new Error("User not found");
        }

        // Respond with the updated user (including the new payment)
        res.status(201).json({
            data: updatedUser,
            message: "Payment created successfully",
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

module.exports = createPaymentController;