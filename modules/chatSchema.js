const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    message: { type: String, required: true },
    screenshot: { type: String, default: "" }, // Optional field
    sentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who sent the message
    createdAt: { type: Date, default: Date.now }, // Timestamp of when the message was sent
});

const ChatModel = mongoose.model('Chat', chatSchema);
module.exports = ChatModel;