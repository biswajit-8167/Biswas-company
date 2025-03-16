const UserModel = require("../modules/userSchema");

async function getPaymentsByStudentController(req, res) {
    try {
        const { studentId } = req.params;

        // Find the student by ID and fetch their payments
        const student = await UserModel.findById(studentId).select('username email payments');

        if (!student) {
            throw new Error("Student not found");
        }

        // Respond with the student's payments
        res.status(200).json({
            data: student.payments,
            message: "Payments fetched successfully",
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

module.exports = getPaymentsByStudentController;