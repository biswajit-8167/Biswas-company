const userModel = require("../modules/userSchema");

async function getAllStudentsController(req, res) {
    try {
        // Fetch all users with the role "student"
        const students = await userModel.find({ role: 'student' }).select('-password'); // Exclude the password field

        // Respond with the list of students
        res.status(200).json({
            data: students,
            message: "Students fetched successfully",
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

module.exports = getAllStudentsController;