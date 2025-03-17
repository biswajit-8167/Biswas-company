const UserModel = require("../modules/userSchema");
const BatchModel = require("../modules/batchSchema");
const ChatModel = require("../modules/chatSchema");

async function getDashboardDataController(req, res) {
    try {
        // Fetch total number of students
        const totalStudents = await UserModel.countDocuments({ role: 'student' });

        // Fetch total number of accountants
        const totalAccountants = await UserModel.countDocuments({ role: 'accountant' });

        // Fetch total number of batches
        const totalBatches = await BatchModel.countDocuments();

        // Fetch total number of payments (sum of all payments across users)
        const usersWithPayments = await UserModel.find().select('payments');
        const totalPayments = usersWithPayments.reduce((total, user) => total + user.payments.length, 0);

        // Fetch recent payments (last 10 payments across all users)
        const recentPayments = await UserModel.aggregate([
            { $unwind: '$payments' }, 
            { $sort: { 'payments.paymentDate': -1 } },  
            { $limit: 10 },  
            {
                $project: {
                    _id: 0, 
                    payment: '$payments', 
                    user: { username: 1, email: 1 }  
                }
            }
        ]);

        // Fetch recent chat messages (last 5 messages)
        const recentMessages = await ChatModel.find()
            .sort({ createdAt: -1 })  
            .limit(5)
            .populate('sentBy', 'username email');  

        // Respond with the dashboard data
        res.status(200).json({
            data: {
                totalStudents,
                totalAccountants,
                totalBatches,
                totalPayments,
                recentPayments,
                recentMessages,
            },
            message: "Dashboard data fetched successfully",
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

module.exports = getDashboardDataController;