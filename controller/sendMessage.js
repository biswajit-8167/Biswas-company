const ChatModel = require("../modules/chatSchema");

async function sendMessageController(req, res) {
    try {
        const { message, screenshot, sentBy } = req.body;

        // Validate required fields
        if (!message || !sentBy) {
            throw new Error("Message and sentBy are required");
        }

        // Create a new chat message
        const newMessage = new ChatModel({
            message,
            screenshot: screenshot || "", // Optional field
            sentBy,
        });

        // Save the message to the database
        const savedMessage = await newMessage.save();

        // Respond with the saved message
        res.status(201).json({
            data: savedMessage,
            message: "Message sent successfully",
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

module.exports = sendMessageController;