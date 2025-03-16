 
const UserModel = require("../modules/userSchema");

async function getAllUserPaymentsController(req, res) {
    try {
        // Fetch all users and their payments
        const users = await UserModel.find().select('username email payments');

        // Respond with the list of users and their payments
        res.status(200).json({
            data: users,
            message: "All user payments fetched successfully",
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

module.exports = getAllUserPaymentsController;