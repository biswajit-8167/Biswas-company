const BatchModel = require("../modules/batchSchema");
const UserModel = require("../modules/userSchema");

async function createBatchController(req, res) {
    try {
        const { batchName, batchImage, googleSheetLink, accountantEmail, coursePrice } = req.body;

        // Validate required fields
        if (!batchName || !batchImage || !googleSheetLink || !accountantEmail || !coursePrice) {
            throw new Error("All fields are required");
        }

        // Find the accountant by email
        const accountant = await UserModel.findOne({ email: accountantEmail, role: 'accountant' });
        if (!accountant) {
            throw new Error("Accountant not found");
        }

        // Get the user ID of the creator (from the authenticated request)
        const createdBy = req.user._id;

        // Create a new batch
        const newBatch = new BatchModel({
            batchName,
            batchImage,
            googleSheetLink,
            accountant: accountant._id, // Associate the batch with the accountant
            students: [], // Initially, no students are assigned
            createdBy,
            coursePrice,
        });

        // Save the batch to the database
        const savedBatch = await newBatch.save();

        // Respond with the created batch
        res.status(201).json({
            data: savedBatch,
            message: "Batch created successfully",
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

module.exports = createBatchController;