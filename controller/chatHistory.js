const ChatModel = require("../modules/chatSchema");

async function getChatHistoryController(req, res) {
    try {
        // Fetch all chat messages and populate the sentBy field with user details
        const chatHistory = await ChatModel.find()
            .populate('sentBy', 'username email') 
            .sort({ createdAt: 1 });  

        // Respond with the chat history
        res.status(200).json({
            data: chatHistory,
            message: "Chat history fetched successfully",
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

module.exports = getChatHistoryController;