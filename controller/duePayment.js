const UserModel = require("../modules/userSchema");

// async function getDuePaymentsController(req, res) {
//     try {
//         // Fetch users with dueAmount greater than 0
//         const usersWithDuePayments = await UserModel.find({ dueAmount: { $gt: 0 } })
//             .select('username email dueAmount payments'); // Include relevant fields

//         // Respond with the list of users with due payments
//         res.status(200).json({
//             data: usersWithDuePayments,
//             message: "Due payments fetched successfully",
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

const getDuePaymentsController = async (req, res) => {
    try {
        // Fetch users with dueAmount > 0
        const usersWithDuePayments = await UserModel.find({ dueAmount: { $gt: 0 } })
            .select('username email dueAmount payments batch')
            .populate('batch', 'batchName coursePrice'); // Populate batch details

        if (usersWithDuePayments.length === 0) {
            return res.status(404).json({ message: 'No users with due payments found.' });
        }

        res.status(200).json({ users: usersWithDuePayments });
    } catch (error) {
        console.error('Error fetching due payments:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = getDuePaymentsController;