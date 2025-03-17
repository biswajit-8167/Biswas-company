const UserModel = require("../modules/userSchema");

async function getDuePaymentsController(req, res) {
    try {
        // Fetch users with dueAmount greater than 0
        const usersWithDuePayments = await UserModel.find({ dueAmount: { $gt: 0 } })
            .select('username email dueAmount payments'); // Include relevant fields

        // Respond with the list of users with due payments
        res.status(200).json({
            data: usersWithDuePayments,
            message: "Due payments fetched successfully",
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

module.exports = getDuePaymentsController;