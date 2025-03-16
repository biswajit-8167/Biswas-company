const BatchModel = require("../modules/batchSchema");

async function deleteBatchController(req, res) {
    try {
        const { batchId } = req.params;

        // Find the batch by ID and delete it
        const deletedBatch = await BatchModel.findByIdAndDelete(batchId);

        if (!deletedBatch) {
            throw new Error("Batch not found");
        }

        // Respond with success
        res.status(200).json({
            message: "Batch deleted successfully",
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

module.exports = deleteBatchController;