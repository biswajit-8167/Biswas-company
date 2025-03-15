const userModel = require("../modules/userSchema");

async function getUserProfileController(req, res) {
    try {
        // Access user ID from req.user (set by middleware)
        const userId = req.user._id;

        // Fetch user profile from the database
        const user = await userModel.findById(userId).select('-password');
        if (!user) {
            throw new Error("User not found");
        }

        // Respond with the user profile
        res.status(200).json({
            data: user,
            message: "User profile fetched successfully",
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

module.exports = getUserProfileController;