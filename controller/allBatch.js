const BatchModel = require("../modules/batchSchema");

async function getAllBatchesController(req, res) {
    try {
        // Fetch all batches from the database
        const batches = await BatchModel.find()
            .populate('accountant', 'username email') // Populate accountant details
            .populate('students', 'username email') // Populate students details
            .populate('createdBy', 'username email'); // Populate createdBy details

        // Respond with the list of batches
        res.status(200).json({
            data: batches,
            message: "Batches fetched successfully",
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

module.exports = getAllBatchesController;