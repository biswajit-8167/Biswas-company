const BatchModel = require("../modules/batchSchema");

async function getBatchByIdController(req, res) {
    try {
        const { batchId } = req.params;

        // Fetch the batch by ID
        const batch = await BatchModel.findById(batchId)
            .populate('accountant', 'username email') 
            .populate('students', 'username email') 
            .populate('createdBy', 'username email'); 

        if (!batch) {
            throw new Error("Batch not found");
        }

        // Respond with the batch details
        res.status(200).json({
            data: batch,
            message: "Batch fetched successfully",
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

module.exports = getBatchByIdController;