// const UserModel = require("../modules/userSchema");

// async function getAllAccountantsController(req, res) {
//     try {
//         console.log("Fetching accountants...");

//         // Fetch all users with the role "accountant"
//         const accountants = await UserModel.find({ role: 'accountant' }).select('-password');

//         console.log("Accountants found:", accountants); // Log the results

//         // Respond with the list of accountants
//         res.status(200).json({
//             data: accountants,
//             message: "Accountants fetched successfully",
//             error: false,
//             success: true,
//         });
//     } catch (error) {
//         console.error("Error fetching accountants:", error); // Log the error
//         res.status(400).json({
//             message: error.message || error,
//             error: true,
//             success: false,
//         });
//     }
// }

// module.exports = getAllAccountantsController;


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