const userModel = require("../modules/userSchema");

async function updateUserProfileController(req, res) {
    try {
        const { username, email, profilePicture } = req.body;

        // Validate required fields
        if (!username || !email) {
            throw new Error("Username and email are required");
        }

        // Get the user ID from the authenticated request (set by middleware)
        const userId = req.user._id;

        // Prepare the update payload
        const updatePayload = {
            username,
            email,
            ...(profilePicture && { profilePicture }), // Include profilePicture only if provided
        };

        // Update the user profile
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            updatePayload,
            { new: true } // Return the updated document
        ).select('-password'); // Exclude the password field

        if (!updatedUser) {
            throw new Error("User not found");
        }

        // Respond with the updated user profile
        res.status(200).json({
            data: updatedUser,
            message: "User profile updated successfully",
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

module.exports = updateUserProfileController;