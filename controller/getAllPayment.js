// const UserModel = require("../modules/userSchema");

// async function getAllPaymentsController(req, res) {
//     try {
//         // Get the user ID from the authenticated request
//         const userId = req.user._id;

//         // Find the user and fetch their payments
//         const user = await UserModel.findById(userId).select('payments');

//         if (!user) {
//             throw new Error("User not found");
//         }

//         // Respond with the list of payments
//         res.status(200).json({
//             data: user.payments,
//             message: "Payments fetched successfully",
//             error: false,
//             success: true,
//         });
//     } catch (error) {
//         res.status(400).json({
//             message: error.message || error,
//             error: true,
//             success: false,
//         });
//     }
// }

// module.exports = getAllPaymentsController;



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