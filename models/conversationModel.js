const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        unique: true,
        required: true
    },
    messages : {
        type: Array
    }
}) 

const ConversationModel = mongoose.model('conversations', conversationSchema)

module.exports = ConversationModel