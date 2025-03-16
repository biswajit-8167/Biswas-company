const BatchModel = require("../modules/batchSchema");
const UserModel = require("../modules/userSchema");

async function updateBatchController(req, res) {
    try {
        const { batchId } = req.params;
        const { batchName, batchImage, googleSheetLink, accountantEmail, coursePrice } = req.body;

        console.log("Request Body:", req.body); // Log the request body
        console.log("Batch ID:", batchId); // Log the batch ID

        // Validate required fields
        if (!batchName || !batchImage || !googleSheetLink || !accountantEmail || !coursePrice) {
            throw new Error("All fields are required");
        }

        // Find the accountant by email
        const accountant = await UserModel.findOne({ email: accountantEmail, role: 'accountant' });
        if (!accountant) {
            throw new Error("Accountant not found");
        }

        console.log("Accountant found:", accountant); // Log the accountant details

        // Find the batch by ID and update it
        const updatedBatch = await BatchModel.findByIdAndUpdate(
            batchId,
            {
                batchName,
                batchImage,
                googleSheetLink,
                accountant: accountant._id,  
                coursePrice,
            },
            { new: true } // Return the updated document
        )
            .populate('accountant', 'username email') // Populate accountant details
            .populate('students', 'username email') // Populate students details
            .populate('createdBy', 'username email'); // Populate createdBy details

        if (!updatedBatch) {
            throw new Error("Batch not found");
        }

        console.log("Updated Batch:", updatedBatch); // Log the updated batch

        // Respond with the updated batch
        res.status(200).json({
            data: updatedBatch,
            message: "Batch updated successfully",
            error: false,
            success: true,
        });
    } catch (error) {
        console.error("Error updating batch:", error); // Log the error
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = updateBatchController;