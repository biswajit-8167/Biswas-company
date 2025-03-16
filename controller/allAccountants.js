 

const userModel = require("../modules/userSchema");

async function  getAllAccountantsController(req, res) {
    try {
        // Fetch all users with the role "student"
        const  accountants = await userModel.find({ role: 'accountant' }).select('-password');  

        // Respond with the list of students
        res.status(200).json({
            data:  accountants,
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

module.exports =  getAllAccountantsController;