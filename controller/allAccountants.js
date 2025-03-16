const UserModel = require("../modules/userSchema");

async function getAllAccountantsController(req, res) {
    try {
        // Fetch all users with the role "accountant"
        const accountants = await UserModel.find({ role: 'accountant' }).select('-password'); // Exclude the password field

        // Respond with the list of accountants
        res.status(200).json({
            data: accountants,
            message: "Accountants fetched successfully",
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

module.exports = getAllAccountantsController;